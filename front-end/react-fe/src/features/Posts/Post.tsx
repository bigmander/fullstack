import React, { useState } from "react"
import { PostProps } from "./PostProps";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Menu, MenuItem } from "@mui/material";

const Post: React.FC<PostProps> = ({
    post
}) => {
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

    return <>
        <Card variant="outlined">


            <CardHeader
                title={post.title}
                subheader={post.createdAt.toString()}
                avatar={<Avatar>{post.author.substring(0, 1)}</Avatar>}
                action={
                    post.canManage ? <IconButton onClick={handleOpen}>
                        <MoreVertIcon />

                        <Menu
                            anchorEl={$menu}
                            open={$menu !== null}
                            onClose={handleClose}
                        >
                            <MenuItem >
                                <Link to={`/posts/${post.id}`}>Edit</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={`/posts/${post.id}`}>Delete</Link>
                            </MenuItem>
                        </Menu>

                    </IconButton> : <></>

                }
            ></CardHeader>
        </Card>
        <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{post.comments.length} comments</AccordionSummary>
            <AccordionDetails>

                <p>{JSON.stringify(post.comments)}</p>
                {!post.canComment && <Button variant="contained">Add comment</Button>}
            </AccordionDetails>
        </Accordion>
    </>
}
export default Post;