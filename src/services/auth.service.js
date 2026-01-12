import { api } from "../api/api";

export const loginService = (data) => {
   return api.post('/login', data);
} 