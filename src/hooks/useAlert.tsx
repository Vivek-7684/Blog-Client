import { useState } from "react";

export type AlertType = "success" | "error" | "warning" | "info" | "";

export interface AlertState {
  open: boolean;
  type: AlertType;
  message: string;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    type: "",
    message: ""
  });

  const showAlert = (
    type: AlertType,
    message: string,
    timeout = 3000
  ) => {
    setAlert({ open: true, type, message });

    setTimeout(() => {
      setAlert({ open: false, type: "", message: "" });
    }, timeout);
  };

  return { alert, showAlert, setAlert };
};
