import PasswordInput from "@/atoms/Login/PasswordInput"; // Assuming PasswordInput is already atomized
import { useFormContext } from "react-hook-form";

interface PasswordFieldProps {
  passwordName: string;
  confirmPasswordName: string;
}

export default function PasswordField({
  passwordName,
  confirmPasswordName,
}: PasswordFieldProps) {
  const { watch } = useFormContext();
  const password = watch(passwordName);

  return (
    <div>
      <PasswordInput name={passwordName} label="Password" />
      <PasswordInput
        name={confirmPasswordName}
        label="Confirm your password"
        validate={(value) => value === password || "Passwords do not match"}
        showCriteria={false}
      />
    </div>
  );
}
