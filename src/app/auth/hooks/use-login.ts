import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import type { ILoginForm } from "../types/auth-types";

export const STATIC_USERS = [
  {
    email: "coordinator@srtmun.ac.in",
    password: "coord@123",
    _id: "user-coordinator",
    name: "Vishal Panchal",
    mobile: "9876543210",
    role: { id: 1, name: "Coordinator", type: "coordinator" },
    universityName: "Swami Ramanand Teerth Marathwada University, Nanded",
  },
  {
    email: "director@srtmun.ac.in",
    password: "director@123",
    _id: "user-director",
    name: "Dr. Rajesh Sharma",
    mobile: "9876543211",
    role: { id: 2, name: "Director", type: "director" },
    universityName: "Swami Ramanand Teerth Marathwada University, Nanded",
  },
  {
    email: "vc@srtmun.ac.in",
    password: "vc@123",
    _id: "user-vc",
    name: "Prof. Dilip Dhonde",
    mobile: "9876543212",
    role: { id: 3, name: "Vice Chancellor", type: "vc" },
    universityName: "Swami Ramanand Teerth Marathwada University, Nanded",
  },
  {
    email: "acs@srtmun.ac.in",
    password: "acs@123",
    _id: "user-acs",
    name: "Dr. Suresh Patil",
    mobile: "9876543213",
    role: { id: 4, name: "ACS", type: "acs" },
    universityName: "Swami Ramanand Teerth Marathwada University, Nanded",
  },
];

const useLogin = () => {
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState<ILoginForm>({ email: "", password: "" });
  const [isPending, setIsPending] = useState(false);

  const handleChange = (key: keyof ILoginForm, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      const match = STATIC_USERS.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (!match) {
        toast.error("Invalid email or password");
        setIsPending(false);
        return;
      }
      const { password: _, ...userInfo } = match;
      setUser(userInfo);
      toast.success(`Welcome, ${userInfo.name}!`);
      setIsPending(false);
    }, 500);
  };

  return { formData, isPending, handleChange, handleSubmit };
};

export default useLogin;
