import { AppBar, Toolbar, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from 'react';
import { api } from '../api/api';

export default function Home() {

    const [blogs, setBlogs] = useState('');

    const [loadmore, setLoadmore] = useState(5);

    useEffect(() => {
        api.get("blog")
            .then((response) => {
                setBlogs(response.data[0]);
            })
            .catch((err) => {

                let messages = [];

                if (Array.isArray(err.response.data)) {
                    messages = err.response.data.map((errmsg) => errmsg.msg);
                } else {
                    messages = [err.response.data];
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
    }, [])

    const getLoadMore = () => {
        setLoadmore(prev => Math.min(prev + 5, blogs.length));
    }

    console.log(blogs);


    return (

        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 1)', width: '100%', overflowX: 'hidden' }}>

            {blogs.length > 0 && <Typography variant="h4" sx={{ p: 5, fontWeight: '700', color: 'black' }}>Recently Added Blogs</Typography>}

            {blogs.length > 0 ? (<Stack direction={"row"} sx={{ p: 3, width: '100vw' }} gap={1} flexWrap={"wrap"}>

                {blogs && blogs.slice(0, loadmore).map((data, index) => {
                    return (
                        <Paper key={index} sx={{ bgcolor: 'white', width: '30%', height: '450px', p: 1 }} elevation={3}>
                            <Avatar alt="Blog" src={`http://localhost:3000/${data.image_url.replace("\\", '/')}`} variant="square" sx={{ width: "100%", height: "auto" }} />
                            <Typography variant="h6" sx={{ p: 1, fontWeight: '700', fontSize: '20px' }}>{data.title}</Typography>
                            <Typography variant="p" sx={{ p: 1, fontSize: '16px', fontWeight: '500' }}>
                                {data.content.substring(0, 300)}
                            </Typography>
                            <Button sx={{ fontSize: '10px', p: 1 }}>ReadMore</Button>
                        </Paper>
                    )
                })}
                {blogs.length > 0 && blogs.length > 5 && loadmore !== blogs.length && (<Stack sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                    <Button sx={{ p: 2, color: 'white', bgcolor: 'orange', width: '20%', fontSize: '16px', fontWeight: '700' }} variant='contained' onClick={getLoadMore}>LoadMore...</Button>
                </Stack>)}
            </Stack>) :
                <Typography variant="h6" sx={{ p: 1, fontWeight: '700', fontSize: '20px', p: 10, textAlign: 'center' }}>Please Add Your Blogs.Currently No Blogs are available to show.</Typography>}
        </Box>

    )
} 