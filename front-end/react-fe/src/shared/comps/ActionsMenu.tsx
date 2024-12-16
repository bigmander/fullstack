import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function ActionsMenu({
    actionsList = [{
        label: '',
        action: () => { }
    }], actionsStyle = {
        color: 'black'
    }
}) {
    const [$menu, set$Menu] = useState<HTMLElement | null>(null);

    const handleClose = () => {
        if ($menu !== null) {
            set$Menu(null);
        }
    };

    const handleOpen = (e: React.MouseEvent<HTMLElement>): void => {
        e.stopPropagation();

        if ($menu === null) {
            set$Menu(e.currentTarget)
        }
    };

    return <>
        {actionsList.length > 0 && <IconButton onClick={handleOpen}>
            <MoreVertIcon sx={actionsStyle} />
            <Menu
                anchorEl={$menu}
                open={$menu !== null}
                onClose={handleClose}
            >
                {actionsList.map((actionItem, i) =>
                    <MenuItem key={`menu-item-${i + 1}`} onClick={() => {
                        actionItem.action();
                        handleClose();
                    }}>
                        {actionItem.label}
                    </MenuItem>
                )}
            </Menu>

        </IconButton>}
    </>;
}