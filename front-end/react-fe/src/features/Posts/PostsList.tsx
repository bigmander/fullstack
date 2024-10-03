import React, { useEffect, useState } from 'react';
import httpService from '../../shared/services/HttpService';
import Post from './Post';
import { PostResponseDto } from './PostResponseDto';
import { Link } from 'react-router-dom';

const PostsList: React.FC<any> = () => {
    const [postsList, setPostsList] = useState<PostResponseDto[]>([]);
    useEffect(() => {
        httpService.get<PostResponseDto[]>('/posts').then(({ data = [] }) => {
            console.log(data);
            setPostsList(data)
        });

    }, [])

    return (
        <>
            <Link to='/posts/new'>Create post</Link>

            {postsList.map(post => <Post key={post.id} post={post} />)}
        </>
    );
}
export default PostsList;
