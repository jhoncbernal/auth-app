import React from "react";
import RegisterDialog from "@/molecules/Login/RegisterDialog";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingCircle from "@/atoms/Common/LoadingCircle";

interface Props {
  children: React.ReactNode;
  visibleRegister: boolean;
  setVisibleRegister(visible: boolean): void;
}

export default function LoginTemplate({
  children,
  visibleRegister,
  setVisibleRegister,
}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user.email) {
      router.push("/dashboard");
    }
  }, [router, session?.user.email]);
  return (
    <section>
      {status === "loading" ? (
        <LoadingCircle />
      ) : (
        <main className={`h-screen w-full flex ${visibleRegister && "blur"}`}>
          <div
            className="w-full h-screen m-auto flex flex-col align-items-center justify-content-center bg-[url('/assets/images/background/bg-login.webp')]
					xl:flex-1"
          >
            {children}
          </div>
          <div
            className="hidden xl:flex xl:h-screen xl:flex-1 xl:bg-[url('/assets/images/background/bg-login.png')]
					bg-auto bg-no-repeat bg-white bg-[90px_90px]"
            style={{ backgroundSize: "90%" }}
          ></div>
          <RegisterDialog
            visible={visibleRegister}
            setVisible={setVisibleRegister}
          />
        </main>
      )}
    </section>
  );
}
