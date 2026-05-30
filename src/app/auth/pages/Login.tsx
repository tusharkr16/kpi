import { Lock, Mail, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import useLogin, { STATIC_USERS } from "../hooks/use-login";

const roleColors: Record<string, string> = {
  coordinator: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
  director:    "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100",
  vc:          "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100",
  acs:         "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100",
};

const Login = () => {
  const { formData, isPending, handleChange, handleSubmit } = useLogin();

  return (
    <div className={cn("min-h-screen flex items-center justify-center", "bg-gradient-to-br from-primary/20 via-primary/10 to-background")}>
      <div className="w-full max-w-md p-6 md:p-10 bg-white rounded-2xl shadow-lg">

        {/* Branding */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">KPI Monitoring</p>
            <p className="text-xs text-muted-foreground mt-0.5">SRTMUN, Nanded — Performance Dashboard</p>
          </div>
        </div>

        {/* Quick-login chips */}
        <div className="mb-5">
          <p className="text-xs text-muted-foreground font-medium mb-2">Quick login as:</p>
          <div className="grid grid-cols-2 gap-2">
            {STATIC_USERS.map((u) => (
              <button
                key={u.email}
                type="button"
                onClick={() => { handleChange("email", u.email); handleChange("password", u.password); }}
                className={cn(
                  "text-left border rounded-xl px-3 py-2.5 transition-colors",
                  roleColors[u.role.type]
                )}
              >
                <p className="text-xs font-bold">{u.role.name}</p>
                <p className="text-[10px] opacity-70 truncate">{u.email}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-muted-foreground">or enter manually</span></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                className="pl-10"
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
              <PasswordInput
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-1" isLoading={isPending} loadingText="Logging in...">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
