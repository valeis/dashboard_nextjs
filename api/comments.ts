import axiosInstance from "./apiInstance";
import { Comment } from "../types/Comment";

const commentRequest = {
    post:async (comment:Comment) => {
        const res = await axiosInstance.post('comments', comment);
        return res.data;
    },
    get:async(postId:string) => {
        const res = await axiosInstance.get(`/comments?postId=${postId}`);
        return res.data;
    },
    delete: async (id:string) => {
        const res = await axiosInstance.delete(`/comments/${id}`);
        return res.data;
    },
    put: async (comment:Comment) => {
        const res = await axiosInstance.put(`comments/${comment!.id}`, comment);
        return res.data;
    }
}

export default commentRequest;