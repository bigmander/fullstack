import React, { useEffect, useState } from "react"
import PostForm from "./PostForm";
import httpService from '../../shared/services/HttpService';

import { PostResponseDto } from "./PostResponseDto";
import { useParams } from "react-router-dom";
const PostEdit: React.FC<object> = () => {
    const [post, setPost] = useState<PostResponseDto>();
    const {
        id
    } = useParams<'id'>();
    useEffect(() => {
        httpService.get<PostResponseDto>('/posts/' + id)
            .then(({ data }) => {
                setPost(data)
                console.log(data);
            });
    }, [])

    return <PostForm {...post} />
}
export default PostEdit;