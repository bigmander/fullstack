export interface PostResponseDto {
    canManage: boolean;
    id: string;
    title: string;
    body: string;
    canComment: boolean;
    author: string;
    lastModification: Date | string;
    createdAt: Date | string;
    updatedBy: string;
    comments: CommentDto[];
}

export interface CommentDto {
    id: string;
    title: string;
    body: string;
    author?: string;
    lastModification?: Date;
    createdAt?: Date;
    updatedBy?: string;
    postId: string;

}
