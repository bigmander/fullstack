import React, { useEffect, useState } from 'react';
import httpService from '../../shared/services/HttpService';
import Post from './Post';
import { PostResponseDto } from './PostResponseDto';

const PostsList: React.FC<any> = () => {
    const [postsList, setPostsList] = useState<PostResponseDto[]>([]);
    useEffect(() => {
        httpService.get<PostResponseDto[]>('/posts').then(({ data = [] }) => {
            setPostsList(data)
        });

    }, [])

    return (
        <>
            {postsList.map(post => <Post key={post.id} post={post} />)}
        </>
    );
}
export default PostsList;
