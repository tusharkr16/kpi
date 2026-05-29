import env from "@/lib/env";
import axios from "axios";

export const client = axios.create({
  baseURL: `${env.BACKEND_URL}/api`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export type AxiosError = {
  response?: {
    data?: {
      status: string;
      error: string;
      message?: string;
      details: {
        messages: string[];
      };
    };
  };
};
