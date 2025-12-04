import { AppBar, Toolbar, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { data } from "../data";
import { useState, useEffect } from 'react';

export default function Home() {

    const [blogs, setBlogs] = useState(data);

    const [loadmore, setLoadmore] = useState(5);

    const getLoadMore = () => {
        setLoadmore(prev => Math.min(prev + 5, data.length));
    }

    


    return (

        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 1)', width: '100%', overflowX: 'hidden' }}>

            <Typography variant="h4" sx={{ p: 2, fontWeight: '700', color: 'black' }}>Recently Added Blogs</Typography>
            <Stack direction={"row"} sx={{ p: 3, width: '100vw' }} gap={1} flexWrap={"wrap"}>

                {data.slice(0, loadmore).map((data, index) => {
                    return (
                        <Paper key={index} sx={{ bgcolor: 'white', width: '30%', height: '30%', p: 1 }} elevation={3}>
                            <Avatar alt="Blog" src={data.image} variant="square" sx={{ width: "100%", height: "auto" }} />
                            <Typography variant="h6" sx={{ p: 1, fontWeight: '700', fontSize: '20px' }}>{data.title}</Typography>
                            <Typography variant="p" sx={{ p: 1, fontSize: '16px', fontWeight: '500' }}>
                                {data.description}
                            </Typography>
                            <Button sx={{ fontSize: '10px', p: 1 }}>ReadMore</Button>
                        </Paper>
                    )
                })}
                {loadmore !== data.length && (<Stack sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                    <Button sx={{ p: 2, color: 'white', bgcolor: 'orange', width: '20%', fontSize: '16px', fontWeight: '700' }} variant='contained' onClick={getLoadMore}>LoadMore...</Button>
                </Stack>)}
            </Stack>
        </Box>

    )
} 