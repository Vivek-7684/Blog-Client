import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Paper,
  Avatar,
  Stack,
  Alert
} from "@mui/material";
import DOMPurify from "dompurify";

import { useBlogs } from "../hooks/useBlogs";
import { Blog } from "../types/blog";

const Home: React.FC = () => {
  const { blogs, alert } = useBlogs();

  const [loadMore, setLoadMore] = useState<number>(5);
  const navigate = useNavigate();

  const getLoadMore = () => {
    setLoadMore(prev => Math.min(prev + 5, blogs.length));
  };

  return (
    <Box sx={{ bgcolor: "white", width: "100%", overflowX: "hidden" }}>
      {alert.open && (
        <Alert
          severity={alert.type}
          sx={{ m: 2, width: "40vw", position: "fixed", zIndex: 20, top: 70 }}
        >
          {alert.message}
        </Alert>
      )}

      {blogs.length > 0 && (
        <Typography
          variant="h4"
          sx={{ p: 5, fontWeight: 700, color: "black" }}
        >
          Recently Added Blogs
        </Typography>
      )}

      {blogs.length > 0 ? (
        <Stack direction="row" sx={{ p: 3 }} gap={1} flexWrap="wrap">
          {blogs.slice(0, loadMore).map((blog: Blog, index: number) => (
            <Paper
              key={index}
              sx={{ width: "30%", height: 590, p: 1, cursor: "pointer" }}
              elevation={3}
              onClick={() => navigate(`/blog?title=${blog.title}`)}
            >
              <Avatar
                src={`http://localhost:3000/${blog.image_url.replace("\\", "/")}`}
                variant="square"
                sx={{ width: 380, height: 220 }}
              />

              <Typography sx={{ p: 1, fontWeight: 700 }}>
                {blog.title}
              </Typography>

              <Typography
                sx={{ p: 1, fontSize: 16 }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    blog.content?.substring(0, 300) || ""
                  )
                }}
              />

              {blog.views && (
                <Typography sx={{ color: "grey", px: 1 }}>
                  {blog.views} views
                </Typography>
              )}

              <Button sx={{ fontSize: 10 }}>Read More</Button>
            </Paper>
          ))}

          {blogs.length > 5 && loadMore !== blogs.length && (
            <Stack width="100%" alignItems="center" p={2}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "orange",
                  width: "20%",
                  fontWeight: 700
                }}
                onClick={getLoadMore}
              >
                Load More...
              </Button>
            </Stack>
          )}
        </Stack>
      ) : (
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, p: 10, textAlign: "center" }}
        >
          Please add your blogs. Currently no blogs are available.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
