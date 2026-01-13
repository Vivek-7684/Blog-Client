import axios from "axios";
import type { api as apiType } from "../types/api.js";

const apiTypeConfig: apiType = {
    baseURL: "http://localhost:3000/",
    withCredentials: true
}

export const api = axios.create(apiTypeConfig);