import LoginDialog from "@/atoms/Login/LoginDialog";
import Image from "next/image";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import Typography from "@/atoms/Common/Typography";
import Label from "@/atoms/Common/Label";
import SubmitButton from "@/atoms/Common/SubmitButton";
import { useForm } from "react-hook-form";
import FacebookIco from "@/assets/icons/facebook.svg";
import GoogleIco from "@/assets/icons/google.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/providers/Toast";
import { PROJECT } from "@/backend/shared/config";

interface Props {
  visible: boolean;
  setVisible(visible: boolean): void;
}

export default function SignInDialog({ visible, setVisible }: Props) {
  const { showToast } = useToast();
  const router = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignIn = handleSubmit(async (data) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      showToast({
        title: "Error",
        type: "error",
        message: response.error,
      });
    } else if (response?.ok && response?.url) {
      setVisible(false);
    }
  });

  const getFormErrorMessage = (fieldName: string) => {
    return errors[fieldName] ? (
      <small className="p-error absolute flex">
        {errors[fieldName]?.message?.toString()}
      </small>
    ) : (
      <small className="p-error absolute flex">&nbsp;</small>
    );
  };

  return (
    <LoginDialog
      visible={visible}
      setVisible={setVisible}
      closeButtonStyle="hidden"
    >
      <div className="m-auto py-3 px-4 sm:px-2 max-w-[450px]">
        <form onSubmit={onSignIn}>
          <Typography
            type="h1"
            color="white"
            text={`This content is exclusive for registered users.`}
            className="text-center mb-2 xl:px-4"
          />
          <Typography
            color="white"
            text={`Please log in to continue.`}
            className="text-center xl:px-4"
          />
          <div className="mt-10 p-4">
            <span className="p-float-label w-full mb-10">
              <InputText
                id="email"
                type="email"
                unstyled
                pt={{
                  root: {
                    className:
                      "w-full text-white px-3 pb-2 border-b border-b-white bg-inherit outline-none",
                  },
                }}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
              />
              {getFormErrorMessage("email")}
              <label className="text-white" htmlFor="email">
                Email
              </label>
            </span>
            <span className={`w-full p-float-label mb-5`}>
              <InputText
                id="password"
                type={`${showPass ? "text" : "password"}`}
                unstyled
                pt={{
                  root: {
                    className:
                      "w-full text-white pl-3 pr-10 pb-2 border-b border-b-white bg-inherit outline-none",
                  },
                }}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              {getFormErrorMessage("password")}
              <i
                onClick={() => setShowPass(!showPass)}
                className={`pi ${
                  showPass ? "pi-eye-slash" : "pi-eye"
                } text-white absolute right-3`}
              ></i>
              <label className="text-white" htmlFor="password">
                Password
              </label>
            </span>
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
                {"Log in"}
              </SubmitButton>
              <p className="text-white text-center my-3">- Or -</p>
            </div>
          </div>
        </form>
        <div className="flex flex-col px-4 justify-between sm:flex-row">
          <SubmitButton
            color="black"
            onClick={() => signIn("google")}
            className="m-0 bg-inherit py-3 mb-2 text-xs flex items-center justify-center
              sm:text-xs sm:mb-0 lg:text-xs lg:py-2.5 lg:px-1 lg:w-[180px]"
          >
            <>
              <Image
                src={GoogleIco}
                width={20}
                height={20}
                alt="google ico"
                className="mr-2"
              />
              Log in with Google
            </>
          </SubmitButton>
          <SubmitButton
            color="black"
            onClick={() => signIn("facebook")}
            className="m-0 bg-inherit py-3 text-xs flex items-center justify-center
              sm:text-xs lg:text-xs lg:py-2.5 lg:px-1 lg:w-[180px]"
          >
            <>
              <Image
                src={FacebookIco}
                width={20}
                height={20}
                alt="facebook ico"
                className="mr-2"
              />
              Log in with Facebook
            </>
          </SubmitButton>
        </div>
        <div className="flex justify-center mt-10">
          <Typography color="white" text={`Don't have an account?`} />
          <button
            onClick={() => {
              router.push(`${PROJECT.host}/login?register=true`);
            }}
            className="text-sm ml-2 text-white underline cursor-pointer sm:text-base"
          >
            {"Create one here"}
          </button>
        </div>
      </div>
    </LoginDialog>
  );
}
