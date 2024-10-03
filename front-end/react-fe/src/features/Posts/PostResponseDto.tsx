export interface PostResponseDto {

    "id": string;
    "title": string;
    "body": string;
    "canComment": boolean;
    "author": string;
    "lastModification": Date | string;
    "createdAt": Date | string;
    "updatedBy": string;
}
