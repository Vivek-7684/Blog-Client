import { api } from "../api/api";

export const addblogService = (formData) => {
    return api.post('/addBlog', formData);
}

export const getSingleBlogService = (title) => {
    return api.post(`/blog?title=${title}`);
}

export const getBlogsService = () => {
    return api.post('/blog');
}