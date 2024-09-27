import React, { useEffect, useState } from "react";
import LoginDialog from "@/atoms/Login/LoginDialog";
import { useDispatch, useSelector } from "react-redux";
import { appSlice, setState } from "@/features/app/appSlice";
import { useSession, signOut } from "next-auth/react";
import { Button } from "primereact/button";
import { useSendVerificationMutation } from "@/features/auth/authApi";
import { useToast } from "@/providers/Toast";
import { usePathname } from "next/navigation";

export default function VerifyModal() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const { isVerifyModalOpen } = useSelector(appSlice.selectSlice);

  const [sendVerification, { isLoading }] = useSendVerificationMutation();
  const { showToast } = useToast();

  const [timer, setTimer] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const onResend = async () => {
    const url =
      pathname !== "/login"
        ? (typeof window !== "undefined" &&
            `${pathname}${window.location.search}`) ||
          "/dashboard/newreport"
        : "/dashboard/newreport";

    const { data } = await sendVerification({ url });

    if (!data?.error) {
      showToast({
        type: "success",
        title: "Verification email sent",
        message: "Please check your inbox",
      });
    }

    setTimer(60);
  };

  return (
    <LoginDialog
      visible={isVerifyModalOpen}
      setVisible={(visible) =>
        dispatch(setState({ isVerifyModalOpen: visible }))
      }
      closeable={false}
      className=""
    >
      <div className="text-white text-center pb-8 md:pt-9 md:pb-14 md:w-[600px]">
        <h2 className="text-sm py-1 md:mb-4 md:text-[28px] font-bold">
          Confirm your email address
        </h2>
        <h2 className="text-sm md:text-[28px] font-bold text-blue-400">
          {session?.user?.email}
        </h2>
        <ol className="my-8 text-xs mx-auto md:text-2xl max-w-[422px]">
          <li>1. Check your inbox</li>
          <li className="italic text-xs md:text-lg">
            (Also check your spam folder)
          </li>
          <li>2. Confirm your email address</li>
          <li>3. Access the dashboard</li>
        </ol>
        <div className="mt-5 flex flex-col gap-2">
          <Button
            loading={isLoading}
            onClick={onResend}
            label={
              timer > 0
                ? `Retry in ${timer}s`
                : isLoading
                ? "Sending again..."
                : "Didn’t receive the verification email?"
            }
            size="small"
            outlined
            disabled={timer > 0 || isLoading}
          />
          <Button
            onClick={() => signOut()}
            label="Sign out"
            text
            severity="secondary"
            className="text-slate-300"
            size="small"
          />
        </div>
      </div>
    </LoginDialog>
  );
}
