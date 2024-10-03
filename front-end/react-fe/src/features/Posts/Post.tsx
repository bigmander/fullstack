import React from "react"
import { PostProps } from "./PostProps";
import { Link } from "react-router-dom";

const Post: React.FC<PostProps> = ({
    post
}) => {
    return <div>


        <h3>{post.title}</h3>
        <Link to={`/posts/${post.id}`}>Edit</Link>
        <Link to={`/posts/${post.id}`}>Delete</Link>
    </div>
}
export default Post;