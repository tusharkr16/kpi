import { client } from "@/http/client";
import type { ILoginForm } from "../types/auth-types";

export const login = (formData: ILoginForm) =>
  client.post("/auth/login", formData);

export const checkToken = () => client.post("/auth/check-token");

export const logout = () => client.post("/auth/logout");
