import { api } from "../api/api";
import { Blog } from "../types/blog";

export const addBlogService = (formData: FormData) => {
  return api.post("/addBlog", formData);
};

export const getBlogsService = () => {
  return api.get<Blog[]>("/blog");
};

export const getSingleBlogService = (title: string) => {
  return api.get<Blog[]>(`/blog?title=${title}`);
};
