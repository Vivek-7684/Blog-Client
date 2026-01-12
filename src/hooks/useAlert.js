import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState({
    open: false,
    type: "success", // default
    message: ""
  });

  const showAlert = (type, message, timeout = 3000) => {
    setAlert({
      open: true,
      type: type === "error" ? "error" : type,
      message
    });

    setTimeout(() => {
      setAlert({ open: false, type: "", message: "" });
    }, timeout);
  };

  return { alert, showAlert, setAlert };
};
