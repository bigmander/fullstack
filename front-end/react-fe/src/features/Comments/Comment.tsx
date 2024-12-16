import React, { useState } from 'react';
import { CommentDto } from '../Posts/PostResponseDto';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import httpService from '../../shared/services/HttpService';
import ActionsMenu from '../../shared/comps/ActionsMenu';
import { getRandomColor } from '../../shared/services/Utils';

const Comment: React.FC<{ comment: CommentDto }> = ({ comment }) => {
    const navigate = useNavigate();

    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

    const randomColor = getRandomColor();

    return <>
        <Card variant="outlined">
            <CardHeader
                title={comment.title}
                subheader={comment?.createdAt?.toString()}
                avatar={<Avatar sx={{ backgroundColor: randomColor }}>{comment.author.substring(0, 1)}</Avatar>}
                action={
                    comment.canDelete ?
                        <ActionsMenu
                            actionsList={[{
                                action: () => {
                                    setIsOpenDialog(true)
                                },
                                label: 'Delete'
                            }]}
                        />
                        : <></>

                }
            ></CardHeader>
        </Card>
        <Dialog
            open={isOpenDialog}
            onClose={() => { setIsOpenDialog(false) }}
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
                    setIsOpenDialog(false);
                }}>Cancel</Button>
                <Button variant="contained" onClick={() => {
                    httpService.delete('/comments/' + comment.id)
                        .then(() => {
                            setIsOpenDialog(false);
                            navigate('/');
                        });
                }} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </>
}
export default Comment;