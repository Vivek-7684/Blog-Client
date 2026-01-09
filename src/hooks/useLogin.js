import { useState } from "react";
import { loginService } from "../services/auth.service";
import { useAlert } from "./useAlert";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const { alert, showAlert } = useAlert();

  const login = async (form) => {
    setLoading(true);

    try {
      await loginService(form);
      showAlert("success", "Login successful");
      return true; // success flag
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        "Invalid email or password";

      showAlert("error", message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, alert };
};
