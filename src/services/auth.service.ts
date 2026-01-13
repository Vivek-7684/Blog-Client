import { api } from "../api/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginService = (data: LoginPayload) => {
  return api.post("/login", data);
};
