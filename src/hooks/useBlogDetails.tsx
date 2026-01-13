import { useEffect, useState } from "react";
import { getSingleBlogService } from "../services/blog.service";
import { useAlert } from "./useAlert";
import { Blog } from "../types/blog";

export const useBlogDetails = (title: string | null) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { alert, showAlert } = useAlert();

  useEffect(() => {
    if (!title) return;

    const fetchBlog = async () => {
      try {
        const res = await getSingleBlogService(title);
        const blogData = res.data[0];

        if (!blogData) {
          showAlert("error", "Blog not found");
          return;
        }

        setBlog(blogData);
      } catch (err: any) {
        showAlert(
          "error",
          err?.response?.data?.error || "Failed to load blog"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [title]);

  return { blog, loading, alert };
};