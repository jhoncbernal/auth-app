import React from "react";
import Typography from "@/atoms/Common/Typography";
import SocialSignInButtons from "@/molecules/Login/SocialSignInButtons";
import LoginForm from "@/molecules/Login/LoginForm";

interface Props {
  setVisibleRegister(visible: boolean): void;
}

export default function Login({ setVisibleRegister }: Props) {
  return (
    <>
      <div className="m-auto py-3 px-4 sm:px-2 max-w-[450px]">
        <LoginForm />
        <SocialSignInButtons />
        <div className="flex justify-center mt-10">
          <Typography color="white" text={`Don't have an account?`} />
          <button
            className="text-sm ml-2 text-white underline cursor-pointer sm:text-base"
            onClick={() => setVisibleRegister(true)}
          >
            {"Create one here"}
          </button>
        </div>
      </div>
    </>
  );
}
