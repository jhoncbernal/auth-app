import { signIn } from "next-auth/react";
import SubmitButton from "@/atoms/Common/SubmitButton";
import Image from "next/image";
import GoogleIco from "@/assets/icons/google.svg";
import FacebookIco from "@/assets/icons/facebook.svg";

export default function SocialSignInButtons() {
  const options = { callbackUrl: "/dashboard", redirect: false };

  return (
    <div className="flex flex-col px-4 justify-between sm:flex-row">
      <SubmitButton
        color="black"
        onClick={() => {
          signIn("google", options);
        }}
        className="m-0 bg-inherit py-3 text-xs flex items-center justify-center
            sm:text-xs lg:text-xs lg:py-2.5 lg:px-1 lg:w-[180px]"
      >
        <>
          <Image
            src={GoogleIco}
            width={20}
            height={20}
            alt="google ico"
            className="mr-2"
          />
          Sign in with Google
        </>
      </SubmitButton>
      <SubmitButton
        color="black"
        onClick={() => signIn("facebook", options)}
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
          Sign in with Facebook
        </>
      </SubmitButton>
    </div>
  );
}
