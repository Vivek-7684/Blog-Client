import { api } from "../api/api";

export const getCommentService = (blogId) => {
    return api.get(`/comment/${blogId}`)
}

export const addCommentService = (comment) => {
    return api.post("/comment/add", comment)
}