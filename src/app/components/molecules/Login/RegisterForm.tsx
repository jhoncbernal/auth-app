import { FormProvider, useForm } from "react-hook-form";
import InputField from "@/atoms/Login/InputField";
import SubmitButton from "@/atoms/Common/SubmitButton";
import PasswordField from "@/molecules/Login/PasswordField";
import { signIn } from "next-auth/react";
import { useToast } from "@/providers/Toast";
import { isMobilePhone } from "validator";
import isEmail from "validator/lib/isEmail";
import Link from "next/link";
import { useState } from "react";

interface RegisterFormProps {
  setVisible: (visible: boolean) => void;
  setUrl: (url: string) => void;
}

export default function RegisterForm({
  setVisible,
  setUrl,
}: RegisterFormProps) {
  const { showToast } = useToast();
  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const [aceptTerms, setAceptTerms] = useState(false);
  const options = { redirect: false, callbackUrl: "/dashboard/newreport" };

  const onSignUp = handleSubmit(async (data) => {
    if (data.password === data.confirmPassword) {
      if (aceptTerms) {
        const response = await signIn("register", {
          email: data.email,
          name: data.name,
          password: data.password,
          phone: data.phone,
          ...options,
        });

        if (response?.error) {
          showToast({
            title: "Error",
            type: "error",
            message: response.error,
          });
        } else if (response?.ok && response?.url) {
          setUrl(response.url);
          setVisible(false);
        }
      } else {
        showToast({
          title: "",
          type: "warn",
          message: "You must accept the terms and conditions",
        });
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSignUp}
        className="m-auto py-3 sm:px-2 max-w-[450px] lg:px-5"
      >
        <InputField
          id="name"
          label="First and Last Name"
          type="text"
          error={errors.name?.message}
          registerOptions={{ required: "Names are required" }}
        />
        <InputField
          id="phone"
          label="Phone"
          type="number"
          error={errors.phone?.message}
          registerOptions={{
            required: "Phone is required",
            validate: (phone: string) =>
              isMobilePhone(phone) || "Enter a valid phone number",
          }}
        />
        <InputField
          id="email"
          label="Corporate Email"
          type="email"
          error={errors.email?.message}
          registerOptions={{
            required: "Email is required",
            validate: (email: string) =>
              isEmail(email) || "You must enter an email.",
          }}
        />
        <PasswordField
          passwordName="password"
          confirmPasswordName="confirmPassword"
        />
        <div className="flex items-center mb-8">
          <input
            type="checkbox"
            className="mr-2"
            checked={aceptTerms}
            onChange={() => setAceptTerms(!aceptTerms)}
          />
          <p className="text-white text-xs md:text-base">
            I have read and accept the{" "}
            <Link href="/terminos" target="_blank" className="underline">
              terms and conditions
            </Link>
          </p>
        </div>
        <div className="flex flex-col">
          <SubmitButton color="white" className="font-medium w-full m-0 py-3.5">
            Sign up
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
}
