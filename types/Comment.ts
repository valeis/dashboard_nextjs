export type Comment = {
    id: number;
    postId?: string;
    content: string;
    createdAt: Date;
    username?: string;
    currentUser: boolean;
    replies: Comment[];
}