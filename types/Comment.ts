export type Comment = {
    id: number;
    postId: number;
    content: string;
    createdAt: Date;
    username?: string;
    currentUser: boolean;
    replies: string[];
}