import { api } from "../api/axios";

export const loginService = (data) => {
    api.post('/login', data);
} 