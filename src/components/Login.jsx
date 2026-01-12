import Stack from '@mui/material/Stack';
import TextFeid from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { loginSchema } from '../validation/validation';
import { api } from '../api/api';
import { useState } from 'react';
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [form, setForm] = useState({}); // form data

    const [error, setError] = useState({});

    const { login, loading, alert } = useLogin();

    const navigate = useNavigate();

    const handleChange = (e) => {

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

        // update form state
        setForm({ ...form, [e.target.name]: e.target.value });

        const updatedField = { [e.target.name]: e.target.value };

        const result = loginSchema.safeParse(updatedField);

        if (!result.success) {
            setError(result.error.flatten().fieldErrors); // show error messages
            return;
        }

        setError({}); //  clear error if validation passes

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const success = await login(form);

        if (success) {
            setTimeout(() => {
                navigate("/admin/add-blog");
            }, 3000)
        }
    }

    return (
        <Stack sx={{ width: '90vw' }} alignItems={'center'} justifyContent={'center'} height={'90vh'}>
            <Stack
                sx={{ backgroundColor: "white", p: 6, width: "30vw", borderRadius: 5, boxShadow: "7px 7px 20px #ccc" }}
                spacing={4}
                alignItems={'center'}
                justifyContent={'center'}>
                {alert.open &&
                    (
                        <Alert
                            severity={alert.type}
                            sx={{ m: 2, width: "40vw", position: "fixed", zIndex: 20, top: 70, left: '50' }}
                        >
                            {alert.message}
                        </Alert>
                    )
                }

                <Typography variant='h4' sx={{ fontSize: "24px", fontWeight: '700' }}>Admin Login</Typography>
                <TextFeid label="Email" error={error?.email?.join()} value={form?.email || ""} helperText={error?.email?.join(".")} name="email" fullWidth variant="outlined" type="text" onChange={(e) => handleChange(e)} />
                <TextFeid label="Password" error={error?.password?.join()} value={form?.password || ""} helperText={error?.password?.join(".")} name="password" fullWidth type="password" variant="outlined" onChange={handleChange} />
                <Button disabled={Object.keys(error).length !== 0 ? true : false} type="submit" sx={{ width: "100%", bgcolor: 'orange' }} onClick={(e) => handleSubmit(e)} variant='contained'>Login</Button>
            </Stack>
        </Stack>
    );
}