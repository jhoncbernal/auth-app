import React, { useState } from "react";
import LoginDialog from "@/atoms/Login/LoginDialog";
import { useRouter } from "next/navigation";
import SubmitButton from "@/atoms/Common/SubmitButton";
import RegisterForm from "./RegisterForm";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleIco from "@/assets/icons/google.svg";
interface Props {
  visible: boolean;
  setVisible(visible: boolean): void;
}

export default function RegisterDialog({
  visible,
  setVisible,
}: Props) {

  const router = useRouter();
    const [url, setUrl] = useState<string | null>(null);

  const handleClose = () => {
    if (url) {
      router.push(url);
      setVisible(false);
    } else {
      setVisible(false);
    }
  };

  return (
    <LoginDialog visible={visible} setVisible={handleClose}>
      <div className="w-full max-w-[610px] md:w-[600px]">
        <h2 className="text-base/5 text-white font-bold text-center mb-1 sm:text-xl sm:mb-10 lg:mb-5 ">
          Sign up and 
          start exploring
        </h2>
        <div className="flex lg:mb-5">
          <SubmitButton
            color="black"
            onClick={() => signIn("google")}
            className="mx-auto m-0 bg-inherit py-2 mb-5 flex items-center justify-center
                sm:!text-xs sm:mb-0 lg:!px-2 sm:w-[220px]"
          >
            <>
              <Image
                src={GoogleIco}
                width={20}
                height={20}
                alt="google ico"
                className="mr-2"
              />
              Sign up with Google
            </>
          </SubmitButton>
        </div>
        <RegisterForm setVisible={setVisible} setUrl={setUrl} />
      </div>
    </LoginDialog>
  );
}
