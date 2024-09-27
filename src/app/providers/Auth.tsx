"use client";
import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setState } from "@/features/app/appSlice";
import VerifyDialog from "@/app/components/organisms/App/VerifyDialog";
import PhoneDialog from "@/organisms/App/PhoneDialog";

interface Props {
  children: React.ReactNode;
}

export const Session = () => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(setState({ isVerifyModalOpen: false, isPhoneModalOpen: false }));

      if (!session.user.emailVerified) {
        dispatch(setState({ isVerifyModalOpen: true }));
      } else if (!session.user.phone || session.user.phone === "private") {
        dispatch(setState({ isPhoneModalOpen: true }));
      }
    }
  }, [status]);

  return (
    <>
      <VerifyDialog />
      <PhoneDialog />
    </>
  );
};

export default function Auth({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
