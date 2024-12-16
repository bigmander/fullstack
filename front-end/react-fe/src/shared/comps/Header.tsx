import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAuth } from '../../features/Auth/AuthProvider';
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

const Header: React.FC<any> = () => {
    const auth = useAuth();
    const [$menu, set$Menu] = useState<HTMLElement | null>(null);
    // const isMenuOpen = Boolean($menu);
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
    const menuOptions = auth.userInfo === null ?
        <Menu
            anchorEl={$menu}
            open={$menu !== null}
            onClose={handleClose}
        >
            <MenuItem>
                <Link to="/login">Login</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/signup">Sign-up</Link>
            </MenuItem>
        </Menu> :
        <Menu
            anchorEl={$menu}
            open={$menu !== null}
            onClose={handleClose}
        >
            <MenuItem >
                <Link to="/posts/new">Create a Post</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/logout">Logout</Link>
            </MenuItem>
            </Menu>;

    return (
        <AppBar position="sticky" elevation={0} variant='outlined'>
            <Toolbar>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    <Link to="/">Full-stack workshop</Link>
                    
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    <IconButton onClick={handleOpen}>
                        <MoreVertIcon />

                        {menuOptions}

                    
                </IconButton>
            </Box>
        </Toolbar>
        </AppBar >
    )
};
export default Header;