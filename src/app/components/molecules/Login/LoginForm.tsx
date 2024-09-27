// src/molecules/Login/LoginForm.tsx
import { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { signIn, SignInOptions } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/Toast";
import InputField from "@/atoms/Login/InputField";
import SubmitButton from "@/atoms/Common/SubmitButton";
import Typography from "@/atoms/Common/Typography";
import Link from "next/link";
import Label from "@/atoms/Common/Label";
import { useSession } from "next-auth/react";
import LoadingCircle from "@/atoms/Common/LoadingCircle";

// Define your form data interface
interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { showToast } = useToast();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);

  // Pass the LoginFormInputs type to useForm
  const methods = useForm<LoginFormInputs>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user.email) {
      router.push("/dashboard");
    }
  }, [router, session?.user.email]);

  // Define the type for the handleSubmit handler
  const onSignIn: SubmitHandler<LoginFormInputs> = async (data) => {
    const options: SignInOptions = {
      callbackUrl: "/dashboard",
      redirect: false,
    };
    const response = await signIn("credentials", { ...data, ...options });
    if (response?.error) {
      showToast({ title: "Error", type: "error", message: response.error });
    } else if (response?.ok && response?.url) {
      router.push(response.url);
    }
  };

  return (
    <section>
      {status === "loading" ? (
        <LoadingCircle />
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSignIn)}
            className="m-auto py-3 px-4 max-w-[450px]"
          >
            <Typography
              color="white"
              text="Enter your details to access your account"
              className="p-float-label w-full mb-6 sm:mb-8 lg:px-3"
            />
            <InputField
              id="email"
              label="Email"
              error={errors.email?.message}
              registerOptions={{ required: "The email is required" }}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              error={errors.password?.message}
              registerOptions={{ required: "The password is required" }}
              showPass={showPass}
              togglePasswordVisibility={() => setShowPass(!showPass)}
            />
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center">
                <input
                  id="rememberme"
                  type="checkbox"
                  onChange={(e: any) => setChecked(e.checked)}
                  checked={checked}
                  className="mr-2 appearance-none w-[19px] h-[19px] border border-white cursor-pointer
                    checked:bg-gradient-radial checked:p-2 checked:from-white checked:to-black"
                />
                <Label color="white" text="Remember me" htmlFor="rememberme" />
              </div>
              
            </div>
            <div className="flex flex-col">
              <SubmitButton color="white" className="w-full m-0 py-3.5">
                Login
              </SubmitButton>
            </div>
            <p className="text-white text-center my-3">- Or -</p>
          </form>
        </FormProvider>
      )}
    </section>
  );
}
