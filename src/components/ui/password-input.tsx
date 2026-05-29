import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const PasswordInput = ({ className, ...props }: Props) => {
  const [show, setShow] = useState(false);
  const disabled = props.value === "" || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        className={cn("hide-password-toggle pr-10", className)}
        {...props}
      />
      <button
        type="button"
        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground/80 cursor-pointer hover:text-foreground"
        onClick={() => setShow((p) => !p)}
        disabled={disabled}
      >
        {!show && !disabled ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  );
};

export { PasswordInput };
