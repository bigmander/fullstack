import React, { useState } from "react"
import httpService from '../../shared/services/HttpService';
import { PostProps } from "./PostProps";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from "@mui/material";
import Comment from "../Comments/Comment";

const Post: React.FC<PostProps> = ({
    post
}) => {
    const navigate = useNavigate();
    const [$menu, set$Menu] = useState<HTMLElement | null>(null);
    const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
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
                            <MenuItem onClick={() => { setOpenDialog(true) }}>
                                Delete
                            </MenuItem>
                        </Menu>

                    </IconButton> : <></>

                }
            ></CardHeader>
            <CardContent>
                <Accordion >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>{post.comments.length} comments</AccordionSummary>
                    <AccordionDetails>
                        {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                        {post.canComment && <Button variant="contained" onClick={() => {
                            navigate(`/posts/${post.id}/new-comment`);
                        }} >Add comment</Button>}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
        <br />

        <Dialog
            open={isOpenDialog}
            onClose={() => { setOpenDialog(false) }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete a Post
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete this post?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpenDialog(false);
                }}>Cancel</Button>
                <Button variant="contained" onClick={() => {
                    httpService.delete('/posts/' + post.id)
                        .then(response => response.data)
                        .then(() => {
                            setOpenDialog(false);
                            navigate('/');
                        });
                }} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </>
}
export default Post;