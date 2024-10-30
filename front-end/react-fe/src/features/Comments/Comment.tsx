import React from 'react';
import { CommentDto } from '../Posts/PostResponseDto';

const Comment: React.FC<{ comment: CommentDto }> = ({ comment }) => {
    return <p>{JSON.stringify(comment)}</p>
}
export default Comment;