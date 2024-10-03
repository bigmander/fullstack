import React from "react"
interface PostFormProps {
    title: string;
    body: string;
    canComment: boolean;
}
const PostForm: React.FC<Partial<PostFormProps>> = (props = {
    body: '',
    canComment: false,
    title: ''
}) => {
    return <form >

        <div>
            <label>Title</label>
            <input defaultValue={props.title} />
        </div>

        <div>
            <label>Body</label>
            <textarea defaultValue={props.body} />

        </div>


        <div>
            <label>Can Comment</label>
            <input type="checkbox" defaultChecked={props.canComment} />
        </div>

        <button >Save</button>

    </form>
}
export default PostForm;