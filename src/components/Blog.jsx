import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { data } from '../data';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import Alert from "@mui/material/Alert";


export const Blog = () => {

    const location = useLocation();

    const search = new URLSearchParams(location.search);

    const [blogs, setBlogs] = useState();
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

    useEffect(() => {
        api.get(`/blog/?title=${search.get('title')}`)
            .then((response) => {
                setBlogs(response.data[0]);
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
    }, [])

    console.log(blogs);
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
            <Typography sx={{ fontWeight: '700', fontSize: '24px', p: 3 }}>{blogs?.title}</Typography>

            <Box sx={{ bgcolor: '#fca815ff', width: '90vw', height: '3px', borderColor: 'none' }}></Box>

            <Avatar alt="Blog" src={`http://localhost:3000/${blogs?.image_url.replace("\\", '/')}`} sx={{ width: '100%', height: 'auto' }} variant='square' />

            <Typography sx={{ fontWeight: '500', fontSize: '18px' }}>{blogs?.content}</Typography>
        </Stack>
    )

}