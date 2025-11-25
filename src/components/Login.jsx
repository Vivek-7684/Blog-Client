import Stack from '@mui/material/Stack';
import TextFeid from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { loginSchema } from '../validation';
import { api } from '../api/api';
import { useState } from 'react';
import { set } from 'zod';

export default function Login() {

    const [form, setForm] = useState({}); // form data

    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

    const [error, setError] = useState({});

    const handleChange = (e) => {
        console.log(e.target.value);
        // clear blank space
        if (e.target.value.trimStart() === "") {
            e.target.value = "";
        }

        // clear error message with user clear input

        if (e.target.value.trim() === "") {
            
            setForm({ ...form, [e.target.name]: e.target.value });

            const newErrors = { ...error };

            delete newErrors[e.target.name];

            setError(newErrors);

            // No Validation
            return;
        }

        setForm({ ...form, [e.target.name]: e.target.value });

        const result = loginSchema.safeParse(form);

        if (!result.success) {
            // console.log(result.error.flatten().fieldErrors);
            setError(result.error.flatten().fieldErrors);
            return;
        }


    }

    // console.log(error);

    const handleSubmit = async (e) => {

        e.preventDefault();

        api.post("/login", form)
            .then((res) => {
                setAlert({ open: true, severity: "success", message: "Login Successful" });

                setTimeout(() => {
                    setAlert({ open: false, severity: "", message: "" });
                }, 3000);
            })
            .catch((err) => {
                let messages = [];
                if (Array.isArray(err.response?.data?.message)) {
                    messages = err.response?.data?.message.map((msg) => msg);
                }
                else if (err.response?.data?.message) {
                    messages.push(err.response?.data?.message);
                }
                setAlert({ open: true, severity: "error", message: "Login Failed" });

                setTimeout(() => {
                    setAlert({ open: false, severity: "", message: "" });
                }, 3000);
            })
    }


    return (
        <Stack sx={{ width: '100vw' }} alignItems={'center'} justifyContent={'center'} height={'100vh'}>
            <Stack
                sx={{ backgroundColor: "white", p: 6, m: 4, width: "30vw", borderRadius: 5, boxShadow: "5px 5px 10px #ccc" }}
                spacing={4}
                alignItems={'center'}
                justifyContent={'center'}>
                <Typography variant='h4' sx={{ fontSize: "24px", fontWeight: '700' }}>Admin Login</Typography>
                <TextFeid label="Email" error={error?.email?.join()} value={form?.email || ""} helperText={error?.email?.join(".")} name="email" fullWidth variant="outlined" type="email" onChange={handleChange} />
                <TextFeid label="Password" error={error?.password?.join()} value={form?.password || ""} helperText={error?.password?.join(".")} name="password" fullWidth type="password" variant="outlined" onChange={handleChange} />
                <Button type="submit" sx={{ width: "100%" }} onClick={() => handleSubmit()} variant='contained'>Login</Button>
            </Stack>
        </Stack>
    );
}