import { useEffect, useState } from "react";
import { getBlogsService } from "../services/blog.service";
import { useAlert } from "./useAlert";
import { Blog } from "../types/blog";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { alert, showAlert } = useAlert();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogsService();
        setBlogs(res.data);
      } catch (err: any) {
        showAlert(
          "error",
          err?.response?.data?.error || "Failed to load blogs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, alert };
};
