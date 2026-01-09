import { useEffect, useState } from "react";
import { getBlogsService } from "../services/blog.service";
import { useAlert } from "./useAlert";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { alert, showAlert } = useAlert();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogsService();
        setBlogs(res.data);
      } catch (err) {
        const message =
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load blogs";

        showAlert("error", message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, alert };
};
