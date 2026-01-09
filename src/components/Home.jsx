import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import { api } from '../api/api';
import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";

export default function Home() {

    const { blogs, loading, alert } = useBlogs();

    const [loadmore, setLoadmore] = useState(5);

    const navigate = useNavigate();

    const getLoadMore = () => {
        setLoadmore(prev => Math.min(prev + 5, blogs.length));
    }

    return (

        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 1)', width: '100%', overflowX: 'hidden' }}>

            {alert.open &&
                (
                    <Alert
                        severity={alert.type}
                        sx={{ m: 2, width: "40vw", position: "fixed", zIndex: 20, top: '70', left: '50' }}
                        onClose={() => setAlert({ open: false, severity: "", messages: "" })}
                    >
                        {alert.message}
                    </Alert>
                )
            }

            {blogs.length > 0 && <Typography variant="h4" sx={{ p: 5, fontWeight: '700', color: 'black' }}>Recently Added Blogs</Typography>}

            {blogs.length > 0 ? (<Stack direction={"row"} sx={{ p: 3, width: '100vw' }} gap={1} flexWrap={"wrap"}>

                {blogs && blogs.slice(0, loadmore).map((data, index) => {
                    return (
                        <Paper key={index} sx={{ bgcolor: 'white', width: '30%', height: '590px', p: 1, cursor: 'pointer' }} onClick={() => navigate(`/blog?title=${data.title}`)} elevation={3}>
                            <Avatar alt="Blog" src={`http://localhost:3000/${data.image_url.replace("\\", '/')}`} variant="square" sx={{
                                width: "380px", height: "220px", "& img": {
                                    objectFit: "fill"
                                }
                            }} />
                            <Typography variant="h6" sx={{ p: 1, fontWeight: '700', fontSize: '20px' }}>{data.title}</Typography>
                            <Typography component={"p"} sx={{ p: 1, fontSize: '16px', fontWeight: '500', }}
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content.substring(0, 300)) }}>
                            </Typography>
                            {data.views && <Typography sx={{ color: 'grey', fontSize: '16px', fontWeight: '500', px: 1 }}>{data.views} views</Typography>}
                            <Button sx={{ fontSize: '10px', p: 1 }}>ReadMore</Button>
                        </Paper>
                    )
                })}
                {blogs.length > 0 && blogs.length > 5 && loadmore !== blogs.length && (<Stack sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                    <Button sx={{ p: 2, color: 'white', bgcolor: 'orange', width: '20%', fontSize: '16px', fontWeight: '700' }} variant='contained' onClick={getLoadMore}>LoadMore...</Button>
                </Stack>)}
            </Stack>) :
                <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '20px', p: 10, textAlign: 'center' }}>Please Add Your Blogs.Currently No Blogs are available to show.</Typography>}
        </Box>

    )
} 