import { useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Avatar, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Alert from "@mui/material/Alert";
import { TextField } from '@mui/material';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { useBlogDetails } from '../hooks/useBlogDetails';
import { useComment } from "../hooks/useComment";


export const Blog = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const search = new URLSearchParams(location.search);

    const { blog, loading, alert: BlogAlert } = useBlogDetails(search.get('title'));

    const {
        comments,
        submitComment,
        alert: commentAlert
    } = useComment(blog?.blog_id);

    const [userComment, setUserComment] = useState({
        name: "",
        comment: ""
    });

    const activeAlert = BlogAlert.open ? BlogAlert : commentAlert;

    return (
        <Stack alignItems={'center'} gap={'1rem'} sx={{ py: 2, px: 10 }}>
            {activeAlert.open &&
                (
                    <Alert
                        severity={activeAlert.type}
                        sx={{ m: 2, width: "40vw", position: "fixed", zIndex: 20, top: '70', left: '50' }}
                    // onClose={() => setAlert({ open: false, severity: "", messages: "" })}
                    >
                        {activeAlert.message}
                    </Alert>
                )
            }
            <Stack justifyContent={'start'} alignItems={'start'} sx={{ width: "100%", height: '10vh' }}>
                <Button sx={{ fontWeight: 500, bgcolor: '#000040', color: 'white' }} onClick={() => navigate('/')}>Back</Button>
            </Stack>

            {blog?.created_at && (
                <Typography sx={{ fontSize: "14px", fontWeight: 500, textAlign: "center", color: "gray" }}>
                    Published on — {blog.created_at.slice(0, 10)}
                </Typography>
            )}

            {/* Views */}
            {blog?.views && <Typography sx={{ color: 'grey', fontSize: '16px', fontWeight: '700' }}>{blog.views} views</Typography>}

            <Typography sx={{ fontWeight: '700', fontSize: '42px', lineHeight: '1', textAlign: 'center' }}>{blog?.title}</Typography>

            {/* Summary */}
            {blog?.summary && (
                <Typography sx={{ fontSize: "18px", fontWeight: 500, textAlign: "center" }}>
                    {blog.summary}
                </Typography>
            )}

            <Box sx={{ bgcolor: '#fca815ff', width: '90vw', height: '3px', my: 2, borderColor: 'none' }}></Box>

            <Avatar alt="Blog" src={`http://localhost:3000/${blog?.image_url.replace("\\", '/')}`} sx={{ width: '60%', height: 'auto' }} variant='square' />

            {/* Quote */}
            {blog?.quote && (
                <Typography sx={{ mt: 2, fontSize: "22px", fontWeight: 600, color: "orange", textAlign: "center" }}>
                    “ {blog.quote} ”
                </Typography>
            )}

            <Typography sx={{ fontWeight: '400', fontSize: '18px', lineHeight: 1.6, px: 10, py: 3 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.content) }}></Typography>

            {/* Sections */}
            {blog?.sections?.map((sec) => (
                <Box key={sec.section_id} sx={{ width: "80%", mt: 1 }}>

                    {/* Subtitle */}
                    <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 2 }}>
                        {sec.sub_title}
                    </Typography>

                    {/* Section Image (optional) */}
                    {sec.image_url && (
                        <Avatar
                            src={`http://localhost:3000/${sec.image_url.replace("\\", '/')}`}
                            variant='square'
                            sx={{
                                width: "100%",
                                height: "350px",
                                borderRadius: 2,
                                "& img": { objectFit: "cover" }
                            }}
                        />
                    )}

                    {/* Section Content */}
                    <Typography sx={{ mt: 2, fontSize: "17px", lineHeight: 1.6 }}>
                        {sec.content}
                    </Typography>
                </Box>
            ))}

            {/* Author Section */}
            {blog?.author && (
                <Box
                    sx={{
                        width: "80%",
                        mt: 6,
                        p: 3,
                        borderRadius: 2,
                        bgcolor: "#f9f9f9",
                        display: "flex",
                        gap: 3,
                        alignItems: "center"
                    }}
                >
                    {/* Author Image */}
                    {blog?.author_image && (
                        <Avatar
                            src={`http://localhost:3000/${blog.author_image.replace("\\", "/")}`}
                            sx={{ width: 100, height: 100 }}
                        />
                    )}

                    {/* Author Details */}
                    <Box>
                        <Typography sx={{ fontSize: "22px", fontWeight: 700 }}>
                            {blog.author}
                        </Typography>

                        {blog.occupation && (
                            <Typography sx={{ fontSize: "16px", color: "gray" }}>
                                {blog.occupation}
                            </Typography>
                        )}

                        {blog.author_desc && (
                            <Typography sx={{ mt: 1, fontSize: "15px", lineHeight: 1.6 }}>
                                {blog.author_desc}
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}


            {/*  Related Posts Section */}
            {blog?.relatedPosts?.length > 0 && (
                <Box sx={{ width: "100%", my: 6 }}>
                    <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 4 }}>
                        Related Posts
                    </Typography>

                    <Stack direction="row" gap={3} flexWrap="wrap">
                        {blog.relatedPosts.map((post, index) => (
                            <Box
                                key={index}
                                sx={{ width: "30%", cursor: "pointer" }}
                                onClick={() => navigate(`/blog?title=${post.title}`)}
                            >
                                <Avatar
                                    src={
                                        post.image_url
                                            ? `http://localhost:3000/${post.image_url.replace("\\", "/")}`
                                            : ""
                                    }
                                    variant="square"
                                    sx={{
                                        width: "100%",
                                        height: "230px",
                                        borderRadius: 2,
                                        "& img": { objectFit: "cover" }
                                    }}
                                />
                                <Typography sx={{ fontWeight: 700, fontSize: "18px", mt: 2 }}>
                                    {post.title}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}

            <Box sx={{ width: "80%", mt: 6 }}>
                <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>Leave a reply:</Typography>

                <TextField
                    multiline
                    rows={5}
                    fullWidth
                    placeholder="Write your comment"
                    sx={{ my: 2 }}
                    value={userComment.comment}
                    onChange={(e) => setUserComment({ ...userComment, comment: e.target.value })}
                />

                <Stack direction="row" gap={2}>
                    <TextField
                        placeholder="Name"
                        value={userComment.name}
                        onChange={(e) => setUserComment({ ...userComment, name: e.target.value })}
                        fullWidth
                    />
                </Stack>

                <Button
                    variant="contained"
                    sx={{ mt: 2, bgcolor: 'orange' }}
                    onClick={async () => { await submitComment({ name: userComment.name, comment: userComment.comment }); setUserComment({ name: "", comment: "" }); }}
                >
                    Post Comment
                </Button>
            </Box>

            <Box sx={{ width: "80%", maxHeight: "300px", overflowY: "auto", mt: 4, border: "1px solid #eee", borderRadius: "8px" }}>
                {comments.length === 0 && <Typography>No comments yet.</Typography>}
                <Box sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'sticky', top: 0, bgcolor: 'white' }}>
                        <Typography sx={{ fontSize: "24px", fontWeight: 700, textAlign: 'center', p: 1 }}>Comments</Typography>
                        <Box sx={{ bgcolor: '#fca815ff', width: '90vw', height: '2px', mx: 5, my: 1, borderColor: 'none' }}></Box>
                    </Box>
                    {comments.map((c, i) => (
                        <Box key={i} sx={{ mb: 2, p: 1, px: 3, borderBottom: "1px solid #ddd" }}>
                            <Typography sx={{ fontWeight: 700 }}>{c.name}</Typography>
                            <Typography sx={{ fontSize: "15px", mt: 1 }}>{c.comment}</Typography>
                            <Typography sx={{ fontSize: "12px", color: "gray", mt: 1 }}>{new Date(c.created_at).toLocaleString()}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>



            {/* Tags */}
            {blog?.tags && (
                <Typography sx={{ mt: 1, fontSize: "14px", fontStyle: "Bold", fontWeight: '700', textAlign: "center" }}>
                    Tags:-- {blog.tags}
                </Typography>
            )}

            {/* Previous & Next Posts */}
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", my: 6 }}>

                {/* Previous Post */}
                {blog?.previousPost ? (
                    <Stack direction="row" alignItems="center" sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/blog?title=${blog.previousPost.title}`)}
                    >
                        <Avatar
                            src={`http://localhost:3000/${blog.previousPost.image_url}`}
                            sx={{ width: "120px", height: "120px", mr: 2 }}
                            variant="square"
                        />
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                            Previous Post: <br />
                            {blog.previousPost.title}
                        </Typography>
                    </Stack>
                ) : (
                    <Box sx={{ width: "120px" }}></Box>
                )}

                {/* Next Post */}
                {blog?.nextPost ? (
                    <Stack direction="row" alignItems="center" sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/blog?title=${blog.nextPost.title}`)}
                    >
                        <Typography sx={{ fontSize: "18px", fontWeight: 600, textAlign: "right", mr: 2 }}>
                            Next Post: <br />
                            {blog.nextPost.title}
                        </Typography>
                        <Avatar
                            src={`http://localhost:3000/${blog.nextPost.image_url}`}
                            sx={{ width: "120px", height: "120px", ml: 2 }}
                            variant="square"
                        />
                    </Stack>
                ) : (
                    <Box sx={{ width: "120px" }}></Box>
                )}

            </Stack>


        </Stack>
    )

}