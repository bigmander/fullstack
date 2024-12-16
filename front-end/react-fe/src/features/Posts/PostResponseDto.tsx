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
    postId: string;
    author: string;
    title: string;
    body: string;
    createdAt: Date | string;
    lastModification?: Date|string;
    canDelete: boolean;
    updatedBy?: string;

}
