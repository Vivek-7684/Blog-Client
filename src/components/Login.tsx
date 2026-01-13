import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { loginSchema } from "../validation/validation";
import { useLogin } from "../hooks/useLogin";

/* ===================== TYPES ===================== */

interface LoginForm {
  email: string;
  password: string;
}

type ErrorState = Record<string, string[] | undefined>;

/* ===================== COMPONENT ===================== */

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: ""
  });

  const [error, setError] = useState<ErrorState>({});

  const { login, loading, alert } = useLogin();
  const navigate = useNavigate();

  /* ===================== HANDLERS ===================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // trim starting spaces
    if (value.trimStart() === "") {
      e.target.value = "";
    }

    // if field cleared
    if (value.trim() === "") {
      setForm(prev => ({ ...prev, [name]: "" }));

      const newErrors = { ...error };
      delete newErrors[name];
      setError(newErrors);

      return;
    }

    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const result = loginSchema.safeParse({ [name]: value });

    if (!result.success) {
      setError(result.error.flatten().fieldErrors);
      return;
    }

    setError({});
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const success = await login(form);

    if (success) {
      setTimeout(() => {
        navigate("/admin/add-blog");
      }, 3000);
    }
  };

  /* ===================== JSX ===================== */

  return (
    <Stack
      sx={{ width: "90vw" }}
      alignItems="center"
      justifyContent="center"
      height="90vh"
    >
      <Stack
        sx={{
          backgroundColor: "white",
          p: 6,
          width: "30vw",
          borderRadius: 5,
          boxShadow: "7px 7px 20px #ccc"
        }}
        spacing={4}
        alignItems="center"
      >
        {alert.open && (
          <Alert
            severity={alert.type}
            sx={{ m: 2, width: "40vw", position: "fixed", zIndex: 20, top: 70 }}
          >
            {alert.message}
          </Alert>
        )}

        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Admin Login
        </Typography>

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          value={form.email}
          error={!!error.email}
          helperText={error.email?.join(".")}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          value={form.password}
          error={!!error.password}
          helperText={error.password?.join(".")}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          sx={{ width: "100%", bgcolor: "orange" }}
          disabled={Object.keys(error).length > 0 || loading}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
