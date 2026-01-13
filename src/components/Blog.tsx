import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { Avatar, Button, Typography, TextField } from "@mui/material";
import DOMPurify from "dompurify";

import { useBlogDetails } from "../hooks/useBlogDetails";
import { useComment } from "../hooks/useComment";
import { Blog as BlogType } from "../types/blog";
import { Comment } from "../types/comment";

/* ===================== TYPES ===================== */

interface UserComment {
  name: string;
  comment: string;
}

/* ===================== COMPONENT ===================== */

const Blog: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const search = new URLSearchParams(location.search);
  const title = search.get("title");

  const {
    blog,
    alert: blogAlert
  } = useBlogDetails(title);

  const {
    comments,
    submitComment,
    alert: commentAlert
  } = useComment(blog?.blog_id);

  const [userComment, setUserComment] = useState<UserComment>({
    name: "",
    comment: ""
  });

  const activeAlert = blogAlert.open ? blogAlert : commentAlert;

  /* ===================== JSX ===================== */

  return (
    <Stack alignItems="center" gap="1rem" sx={{ py: 2, px: 10 }}>
      {activeAlert.open && (
        <Alert
          severity={activeAlert.type || "info"}
          sx={{ m: 2, width: "40vw", position: "fixed", zIndex: 20, top: 70 }}
        >
          {activeAlert.message}
        </Alert>
      )}

      <Stack alignItems="flex-start" sx={{ width: "100%", height: "10vh" }}>
        <Button
          sx={{ fontWeight: 500, bgcolor: "#000040", color: "white" }}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </Stack>

      {blog?.created_at && (
        <Typography sx={{ fontSize: 14, color: "gray" }}>
          Published on — {blog.created_at.slice(0, 10)}
        </Typography>
      )}

      {blog?.views && (
        <Typography sx={{ color: "grey", fontWeight: 700 }}>
          {blog.views} views
        </Typography>
      )}

      <Typography
        sx={{ fontWeight: 700, fontSize: 42, textAlign: "center" }}
      >
        {blog?.title}
      </Typography>

      {blog?.summary && (
        <Typography sx={{ fontSize: 18, textAlign: "center" }}>
          {blog.summary}
        </Typography>
      )}

      <Box sx={{ bgcolor: "#fca815ff", width: "90vw", height: 3, my: 2 }} />

      {blog?.image_url && (
        <Avatar
          src={`http://localhost:3000/${blog.image_url.replace("\\", "/")}`}
          sx={{ width: "60%", height: "auto" }}
          variant="square"
        />
      )}

      {blog?.quote && (
        <Typography sx={{ mt: 2, fontSize: 22, fontWeight: 600, color: "orange" }}>
          “ {blog.quote} ”
        </Typography>
      )}

      {blog?.content && (
        <Typography
          sx={{ fontSize: 18, lineHeight: 1.6, px: 10, py: 3 }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content)
          }}
        />
      )}

      {/* ===================== SECTIONS ===================== */}
      {blog?.sections?.map(sec => (
        <Box key={sec.section_id} sx={{ width: "80%", mt: 1 }}>
          <Typography sx={{ fontSize: 28, fontWeight: 700 }}>
            {sec.sub_title}
          </Typography>

          {sec.image_url && (
            <Avatar
              src={`http://localhost:3000/${sec.image_url.replace("\\", "/")}`}
              variant="square"
              sx={{ width: "100%", height: 350, mt: 2 }}
            />
          )}

          <Typography sx={{ mt: 2, fontSize: 17 }}>
            {sec.content}
          </Typography>
        </Box>
      ))}

      {/* ===================== AUTHOR ===================== */}
      {blog?.author && (
        <Box
          sx={{
            width: "80%",
            mt: 6,
            p: 3,
            borderRadius: 2,
            bgcolor: "#f9f9f9",
            display: "flex",
            gap: 3
          }}
        >
          {blog.author_image && (
            <Avatar
              src={`http://localhost:3000/${blog.author_image.replace("\\", "/")}`}
              sx={{ width: 100, height: 100 }}
            />
          )}

          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
              {blog.author}
            </Typography>

            {blog.occupation && (
              <Typography sx={{ color: "gray" }}>
                {blog.occupation}
              </Typography>
            )}

            {blog.author_desc && (
              <Typography sx={{ mt: 1 }}>
                {blog.author_desc}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {/* ===================== COMMENTS ===================== */}
      <Box sx={{ width: "80%", mt: 6 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Leave a reply:
        </Typography>

        <TextField
          multiline
          rows={5}
          fullWidth
          sx={{ my: 2 }}
          placeholder="Write your comment"
          value={userComment.comment}
          onChange={e =>
            setUserComment(prev => ({
              ...prev,
              comment: e.target.value
            }))
          }
        />

        <TextField
          fullWidth
          placeholder="Name"
          value={userComment.name}
          onChange={e =>
            setUserComment(prev => ({
              ...prev,
              name: e.target.value
            }))
          }
        />

        <Button
          sx={{ mt: 2, bgcolor: "orange" }}
          variant="contained"
          onClick={async () => {
            await submitComment(userComment);
            setUserComment({ name: "", comment: "" });
          }}
        >
          Post Comment
        </Button>
      </Box>

      {/* ===================== COMMENT LIST ===================== */}
      <Box sx={{ width: "80%", mt: 4 }}>
        {comments.length === 0 && <Typography>No comments yet.</Typography>}

        {comments.map((c: Comment, i: number) => (
          <Box key={i} sx={{ mb: 2, borderBottom: "1px solid #ddd" }}>
            <Typography sx={{ fontWeight: 700 }}>{c.name}</Typography>
            <Typography>{c.comment}</Typography>
            <Typography sx={{ fontSize: 12, color: "gray" }}>
              {new Date(c.created_at).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ===================== TAGS ===================== */}
      {blog?.tags && (
        <Typography sx={{ mt: 1, fontWeight: 700 }}>
          Tags: {blog.tags}
        </Typography>
      )}
    </Stack>
  );
};

export default Blog;
