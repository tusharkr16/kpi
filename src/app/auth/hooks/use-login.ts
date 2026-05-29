import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import type { ILoginForm } from "../types/auth-types";

const useLogin = () => {
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState<ILoginForm>({ email: "", password: "" });
  const [isPending, setIsPending] = useState(false);

  const handleChange = (key: keyof ILoginForm, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    // TODO: replace with API call once backend is ready
    setTimeout(() => {
      setUser({
        _id: "mock-user-1",
        name: "Vishal Panchal",
        email: formData.email,
        mobile: "9876543210",
        role: { id: 1, name: "Coordinator", type: "coordinator" },
        universityName: "Solapur University",
      });
      toast.success("Logged in successfully");
      setIsPending(false);
    }, 600);
  };

  return { formData, isPending, handleChange, handleSubmit };
};

export default useLogin;
