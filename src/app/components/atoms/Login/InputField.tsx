import { InputText } from "primereact/inputtext";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  registerOptions: object;
  className?: string;
  showPass?: boolean;
  togglePasswordVisibility?: () => void;
}

export default function InputField({
  id,
  label,
  type = "text",
  error,
  registerOptions,
  className,
  showPass,
  togglePasswordVisibility,
}: InputFieldProps) {
  const { register } = useFormContext(); // Use form context here

  const inputStyle =
    "w-full text-white px-3 pb-1 border-b border-b-white bg-inherit outline-none text-xs sm:text-base sm:pb-2";

  return (
    <div className="p-float-label w-full mb-6 sm:mb-8 lg:px-3">
      <InputText
        id={id}
        className={className}
        type={showPass ? "text" : type}
        unstyled
        pt={{ root: { className: inputStyle } }}
        {...register(id, registerOptions)}
      />
      {togglePasswordVisibility && (
        <i
          onClick={togglePasswordVisibility}
          className={`pi ${
            showPass ? "pi-eye-slash" : "pi-eye"
          } absolute right-3 cursor-pointer`}
        ></i>
      )}
      <label className="text-sm -mt-3 sm:text-base text-white" htmlFor={id}>
        {label}
      </label>
      {error && typeof error === "string" && (
        <small className="p-error absolute flex">{error}</small>
      )}
    </div>
  );
}
