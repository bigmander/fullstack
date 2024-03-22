export interface Comment {
    id: string;
    title: string;
    body: string;
    author?: string;
    lastModification?: Date;
    createdAt?: Date;
    updatedBy?: string;
    postId: string;
}

export interface CommentForm {
    title: string;
    body: string;
}