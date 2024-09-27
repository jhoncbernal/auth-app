import { Button } from "primereact/button";

interface SubmitButtonProps {
  color: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function SubmitButton({
  color,
  children,
  className,
  onClick,
}: SubmitButtonProps) {
  return (
    <Button
      className={`w-full py-2 text-${color} ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
