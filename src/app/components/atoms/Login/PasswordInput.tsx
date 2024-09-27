import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useFormContext } from "react-hook-form";
import {
  passwordValidations,
  passwordSubmitValidation,
} from "@/app/utils/password";

interface PasswordInputProps {
  name: string;
  label: string;
  showCriteria?: boolean;
  validate?: (value: string) => string | boolean; // Add validate prop for custom validation
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
  showCriteria = true,
  validate,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [showPass, setShowPass] = useState(false);
  const [visibleCriteria, setVisibleCriteria] = useState(false);

  const password = watch(name);

  const togglePasswordVisibility = () => setShowPass((prev) => !prev);

  const renderErrorMessage = (fieldName: string) => {
    const error = errors[fieldName]?.message?.toString();
    return error ? (
      <small className="text-[10px]/3 mt-1 md:text-sm p-error flex">
        {error}
      </small>
    ) : (
      <small className="p-error absolute flex">&nbsp;</small>
    );
  };

  const allCriteriaMet = passwordValidations(password).every(
    (validation) => validation.value
  );

  const renderPasswordCriteria = () => (
    <ul className="mt-2 mb-6 ml-3">
      {passwordValidations(password).map(({ message, value }, i) =>
        message ? (
          <li
            key={i}
            className={`list-disc text-xs ${
              value ? "text-emerald-500" : "text-zinc-300"
            }`}
          >
            {message}
          </li>
        ) : null
      )}
    </ul>
  );

  return (
    <div className="w-full mb-6 sm:mb-8 lg:px-3 relative">
      <span className="p-float-label relative">
        <InputText
          id={name}
          type={showPass ? "text" : "password"}
          unstyled
          pt={{
            root: {
              className:
                "w-full text-white px-3 pb-1 border-b border-b-white bg-inherit outline-none text-xs sm:text-base sm:pb-2",
            },
          }}
          {...register(name, {
            required: "The password is required",
            validate: validate || passwordSubmitValidation, // Use the custom validation if provided
          })}
          onFocus={() => setVisibleCriteria(true)}
          onBlur={() => setVisibleCriteria(false)}
          onKeyDown={(e) => e.key === " " && e.preventDefault()} // Prevent space in password
        />
        <i
          onClick={togglePasswordVisibility}
          className={`pi ${
            showPass ? "pi-eye-slash" : "pi-eye"
          } text-white absolute right-3 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
        ></i>
        <label
          className="text-xs text-white sm:-mt-2 md:-mt-3 sm:text-sm md:text-base"
          htmlFor={name}
        >
          {label}
        </label>
      </span>

      {/* Error message */}
      {renderErrorMessage(name)}

      {/* Password criteria list */}
      {showCriteria &&
        ((password && visibleCriteria) || (password && !allCriteriaMet)) &&
        renderPasswordCriteria()}
    </div>
  );
};

export default PasswordInput;
