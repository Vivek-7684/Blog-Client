import { api } from "../api/api";

export const getCommentService = (blogId) => {
    return api.get(`/comment/${response.data[0].blog_id}`)
}

export const addCommentService = (comment) => {
    return api.post("/comment/add", comment)
}