import { Card } from "../types/Card";
import axiosInstance from "./apiInstance";
const LIMIT = 8;

const postsRequest = {
    delete: async (id: string) => {
        const res = await axiosInstance.delete(`/posts/${id}`);
        return res.data;
    },

    getPerPage: async(page:string) => {
        const res = await axiosInstance.get<Card[]>(`/posts?_page=${page}&_limit=${LIMIT}`);
        return res.data;
    },

    getAll: async() => {
        const res = await axiosInstance.get<Card[]>(`/posts`);
        return res.data;
    },

    getById: async (id?:string) => {
        const res = await axiosInstance.get<Card>(`posts/${id}`);
        return res.data;
    },

    post: async (post: Card ) => {
        const res = await axiosInstance.post('posts', post);
        return res.data;
    },

    put: async (id?:string, post?:Card) => {
        const res = await axiosInstance.put(`posts/${id}`, post);
        return res.data
    }
}

export default postsRequest;