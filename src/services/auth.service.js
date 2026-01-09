import { api } from "../api/api";

export const loginService = (data) => {
    api.post('/login', data);
} 