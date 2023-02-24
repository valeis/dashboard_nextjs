import axiosInstance from "./apiInstance";

const commentRequest = {
    post:async (comment:Comment) => {
        const res = await axiosInstance.post('comments', comment);
    },
    get:async() => {
        const res = await axiosInstance.get<Comment[]>(`/comments`);
    }
}

export default commentRequest;