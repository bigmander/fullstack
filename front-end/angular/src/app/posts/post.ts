export interface PostForm {
    title: string;
    body: string;
    canComment: boolean;
}

export interface Post {
    title: string;
    body: string;
    canComment: boolean;
    lastModification: Date | string;
    createdAt: Date | string;
    id: string;
    comments: Comment[];
    author: string;
}
