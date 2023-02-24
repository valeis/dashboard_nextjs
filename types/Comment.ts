export type Comment = {
    id: number;
    content: string;
    createdAt: Date;
    username?: string;
    currentUser: boolean;
    replies: string[];
}