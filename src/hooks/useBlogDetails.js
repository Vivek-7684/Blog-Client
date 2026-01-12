import { useEffect, useState } from "react";
import { getSingleBlogService } from "../services/blog.service";
import { getCommentService } from "../services/comment.service";
import { useAlert } from "./useAlert";

export const useBlogDetails = (title) => {
    
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const { alert, showAlert } = useAlert();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogRes = await getSingleBlogService(title);
        const blogData = blogRes.data[0];

        if (!blogData) {
          showAlert("error", "Blog not found");
          return;
        }

        setBlog(blogData);

      } catch (err) {
        const message =
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load blog details";

        showAlert("error", message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [title]);

  return { blog, loading, alert };
};
