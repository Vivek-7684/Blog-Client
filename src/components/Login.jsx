import Stack from '@mui/material/Stack';
import TextFeid from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Login() {
    return (
        <Stack sx={{ width: '100vw' }} alignItems={'center'} justifyContent={'center'} height={'100vh'}>
            <Stack
                sx={{ backgroundColor: "white", p: 6, m: 4, width: "30vw", borderRadius: 5, boxShadow: "5px 5px 10px #ccc" }}
                spacing={4}
                alignItems={'center'}
                justifyContent={'center'}>
                <Typography variant='h4' sx={{ fontSize: "24px", fontWeight: '700' }}>Admin Login</Typography>
                <TextFeid label="Email" fullWidth variant="outlined" type="email" />
                <TextFeid label="Password" fullWidth type="password" variant="outlined" />
                <Button type="submit" sx={{ width: "100%" }} variant='contained'>Login</Button>
            </Stack>
        </Stack>
    );
}