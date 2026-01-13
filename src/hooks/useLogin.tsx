import { useState } from "react";
import { loginService } from "../services/auth.service";
import { useAlert } from "./useAlert";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { alert, showAlert } = useAlert();

  const login = async (form: LoginForm): Promise<boolean> => {
    setLoading(true);

    try {
      await loginService(form);
      showAlert("success", "Login successful");
      return true;
    } catch (err: any) {
      showAlert(
        "error",
        err?.response?.data?.error || "Invalid email or password"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, alert };
};
