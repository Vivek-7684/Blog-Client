import { api } from "../api/api";
import type { Comment } from "../types/comment";

export interface AddCommentPayload {
  blog_id?: number;
  name: string;
  comment: string;
}

export const getCommentService = (blogId: number) => {
  return api.get<Comment[]>(`/comment/${blogId}`);
};

export const addCommentService = (payload: AddCommentPayload) => {
  return api.post("/comment/add", payload);
};
