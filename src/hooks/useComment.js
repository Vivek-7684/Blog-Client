import { useEffect, useState } from "react";
import {
    getCommentService,
    addCommentService
} from "../services/comment.service";
import { useAlert } from "./useAlert";

export const useComment = (blogId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const { alert, showAlert } = useAlert();

    // fetch comments
    const fetchComments = async () => {
        if (!blogId) return;

        try {
            const res = await getCommentService(blogId);
            setComments(res.data);
        } catch (err) {
            showAlert(
                "error",
                err?.response?.data?.error || "Failed to load comments"
            );
        }
    };

    // auto fetch on blogId change
    useEffect(() => {
        fetchComments();
    }, [blogId]);

    // add comment
    const submitComment = async ({ name, comment }) => {
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

            showAlert("success", "Comment added ");

            await fetchComments(); // refresh list
        } catch (err) {
            showAlert(
                "error",
                err?.response?.data?.error || "Failed to add comment"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        comments,
        submitComment,
        loading,
        alert
    };
};
