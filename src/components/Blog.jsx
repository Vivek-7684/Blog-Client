import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { data } from '../data';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export const Blog = () => {

    const location = useLocation();

    console.log(location.pathname);

    console.log("data", data[0]);

    const a = data[0];

    return (
        <Stack alignItems={'center'} gap={'1rem'} sx={{ py: 2, px: 10 }}>
            <Typography sx={{ fontWeight: '700', fontSize: '24px', p: 3 }}>{a.title}</Typography>

            <Box sx={{ bgcolor: '#fca815ff', width: '90vw', height: '3px', borderColor: 'none' }}></Box>

            <Avatar src={data[0].image} sx={{ width: '100%', height: 'auto' }} variant='square' />

            <Typography sx={{ fontWeight: '500', fontSize: '18px' }}>{data[0].description}</Typography>
        </Stack>
    )

}