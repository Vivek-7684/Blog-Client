import { useEffect, useState } from "react";
import {
  getCommentService,
  addCommentService
} from "../services/comment.service";
import { useAlert } from "./useAlert";
import { Comment } from "../types/comment";

interface SubmitCommentPayload {
  name: string;
  comment: string;
}

export const useComment = (blogId?: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { alert, showAlert } = useAlert();

  const fetchComments = async () => {
    if (!blogId) return;

    try {
      const res = await getCommentService(blogId);
      setComments(res.data);
    } catch (err: any) {
      showAlert(
        "error",
        err?.response?.data?.error || "Failed to load comments"
      );
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const submitComment = async ({ name, comment }: SubmitCommentPayload) => {
    if (!name || !comment) {
      showAlert("error", "Name and comment are required");
      return;
    }

    setLoading(true);

    try {
      await addCommentService({
        blog_id: blogId,
        name,
        comment
      });

      showAlert("success", "Comment added");
      await fetchComments();
    } catch (err: any) {
      showAlert(
        "error",
        err?.response?.data?.error || "Failed to add comment"
      );
    } finally {
      setLoading(false);
    }
  };

  return { comments, submitComment, loading, alert };
};
