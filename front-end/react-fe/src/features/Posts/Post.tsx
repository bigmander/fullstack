import React, { useState } from "react"
import httpService from '../../shared/services/HttpService';
import { PostProps } from "./PostProps";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from "@mui/material";
import Comment from "../Comments/Comment";
import ActionsMenu from "../../shared/comps/ActionsMenu";
import { getRandomColor } from "../../shared/services/Utils";

const Post: React.FC<PostProps> = ({
    post
}) => {
    const navigate = useNavigate();
    const [isOpenDialog, setOpenDialog] = useState<boolean>(false);

    const randomColor = getRandomColor();
    return <>
        <Card variant="outlined">
            <CardHeader
                title={post.title}
                subheader={post.createdAt.toString()}

                avatar={
                    <Avatar
                        sx={{
                            backgroundColor: randomColor
                        }}
                    >
                        {post.author.substring(0, 1)}
                    </Avatar>
                }
                action={
                    post.canManage ?
                        <ActionsMenu
                            actionsList={[{
                                action: () => {
                                    navigate('/posts/' + post.id)
                                },
                                label: 'Edit'
                            }, {

                                action: () => {
                                    setOpenDialog(true)
                                },
                                label: 'Delete'
                            }]}
                        />
                        : <></>

                }
            ></CardHeader>
            <CardContent>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>{post.comments.length} comments</AccordionSummary>
                    <AccordionDetails>
                        {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                        {post.canComment && <Button sx={{ marginTop: '20px' }} variant="contained" onClick={() => {
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