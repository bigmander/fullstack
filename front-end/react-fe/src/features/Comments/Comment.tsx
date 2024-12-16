import React, { useState } from 'react';
import { CommentDto } from '../Posts/PostResponseDto';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import httpService from '../../shared/services/HttpService';

const Comment: React.FC<{ comment: CommentDto }> = ({ comment }) => {
    const navigate = useNavigate();

    const handleOpen = (e: React.MouseEvent<HTMLElement>): void => {
        e.stopPropagation();

        if ($menu === null) {
            set$Menu(e.currentTarget)
        }
    };

    const [$menu, set$Menu] = useState<HTMLElement | null>(null);
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    // const isMenuOpen = Boolean($menu);
    const handleClose = () => {
        if ($menu !== null) {
            set$Menu(null);
        }
    };


    return <>
        <Card variant="outlined">
            <CardHeader
                title={comment.title}
                subheader={comment?.createdAt?.toString()}
                avatar={<Avatar>{comment.author.substring(0, 1)}</Avatar>}
                action={
                    comment.canDelete ? <IconButton onClick={handleOpen}>
                        <MoreVertIcon />

                        <Menu
                            anchorEl={$menu}
                            open={$menu !== null}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {
                                setIsOpenDialog(true);
                             }}>
                                Delete
                            </MenuItem>
                        </Menu>

                    </IconButton> : <></>

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