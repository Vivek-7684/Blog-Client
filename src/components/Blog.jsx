import { useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { data } from '../data';
import { Avatar, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import Alert from "@mui/material/Alert";


export const Blog = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const search = new URLSearchParams(location.search);

    const [blogs, setBlogs] = useState();
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

    useEffect(() => {
        api.get(`/blog/?title=${search.get('title')}`)
            .then((response) => {
                setBlogs(response.data[0]);
                console.log(response.data[0]);
                setAlert({ show: false, type: "", messages: [] });
            })
            .catch((err) => {

                let messages = [];

                if (Array.isArray(err.message)) {
                    messages = err.message.map((errmsg) => errmsg.msg);
                } else {
                    messages = [err.message];
                }

                setAlert({
                    show: true,
                    type: "error",
                    messages
                });

                setTimeout(() => {
                    setAlert({ show: false, type: "", messages: [] });
                }, 3000);

            });
    }, [location.search])

    return (
        <Stack alignItems={'center'} gap={'1rem'} sx={{ py: 2, px: 10 }}>
            {alert.show &&
                (
                    <Alert
                        severity={alert.type}
                        sx={{ m: 2, width: "40vw", position: "fixed", zIndex: 20, top: '70', left: '50' }}
                        onClose={() => setAlert({ open: false, severity: "", messages: "" })}
                    >
                        {alert.messages[0]}
                    </Alert>
                )
            }
            <Stack justifyContent={'start'} alignItems={'start'} sx={{ width: "100%", height: '10vh' }}>
                <Button sx={{ fontWeight: 500, bgcolor: '#000040', color: 'white' }} onClick={() => navigate('/')}>Back</Button>
            </Stack>

            <Typography sx={{ fontWeight: '700', fontSize: '42px', lineHeight: '1', textAlign: 'center' }}>{blogs?.title}</Typography>

            {/* Summary */}
            {blogs?.summary && (
                <Typography sx={{ mt: 1, fontSize: "18px", fontWeight: 500, textAlign: "center" }}>
                    {blogs.summary}
                </Typography>
            )}

            {/* Author + Occupation */}
            {blogs?.author && (
                <Typography sx={{ mt: 1, fontSize: "16px", fontWeight: 600, textAlign: "center" }}>
                    Written By — {blogs.author} ({blogs.occupation})
                </Typography>
            )}

            <Box sx={{ bgcolor: '#fca815ff', width: '90vw', height: '3px', my: 2, borderColor: 'none' }}></Box>

            <Avatar alt="Blog" src={`http://localhost:3000/${blogs?.image_url.replace("\\", '/')}`} sx={{ width: '60%', height: 'auto' }} variant='square' />

            {/* Quote */}
            {blogs?.quote && (
                <Typography sx={{ mt: 2, fontSize: "22px", fontWeight: 600, color: "orange", textAlign: "center" }}>
                    “ {blogs.quote} ”
                </Typography>
            )}

            <Typography sx={{ fontWeight: '400', fontSize: '18px', lineHeight: 1.6, px: 10, py: 3 }}>{blogs?.content}</Typography>

            {/* Sections */}
            {blogs?.sections?.map((sec) => (
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

            {/*  Related Posts Section */}
            {blogs?.relatedPosts?.length > 0 && (
                <Box sx={{ width: "100%", my: 6 }}>
                    <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 4 }}>
                        Related Posts
                    </Typography>

                    <Stack direction="row" gap={3} flexWrap="wrap">
                        {blogs.relatedPosts.map((post, index) => (
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


            {/* Tags */}
            {blogs?.tags && (
                <Typography sx={{ mt: 1, fontSize: "14px", fontStyle: "Bold", fontWeight: '700', textAlign: "center" }}>
                    Tags:-- {blogs.tags}
                </Typography>
            )}

            {/* Previous & Next Posts */}
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", my: 6 }}>

                {/* Previous Post */}
                {blogs?.previousPost ? (
                    <Stack direction="row" alignItems="center" sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/blog?title=${blogs.previousPost.title}`)}
                    >
                        <Avatar
                            src={`http://localhost:3000/${blogs.previousPost.image_url}`}
                            sx={{ width: "120px", height: "120px", mr: 2 }}
                            variant="square"
                        />
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                            Previous Post: <br />
                            {blogs.previousPost.title}
                        </Typography>
                    </Stack>
                ) : (
                    <Box sx={{ width: "120px" }}></Box>
                )}

                {/* Next Post */}
                {blogs?.nextPost ? (
                    <Stack direction="row" alignItems="center" sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/blog?title=${blogs.nextPost.title}`)}
                    >
                        <Typography sx={{ fontSize: "18px", fontWeight: 600, textAlign: "right", mr: 2 }}>
                            Next Post: <br />
                            {blogs.nextPost.title}
                        </Typography>
                        <Avatar
                            src={`http://localhost:3000/${blogs.nextPost.image_url}`}
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