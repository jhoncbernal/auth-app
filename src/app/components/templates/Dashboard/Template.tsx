import React from "react";
import Header from "@/organisms/Header/Header";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingCircle from "@/atoms/Common/LoadingCircle";

interface Props {
  children: React.ReactNode;
}

export default function DashboardTemplate({ children }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session?.user.email) {
      router.push("/login");
    }
  }, [router, session?.user.email]);
  return (
    <section>
      {status === "loading" ? (
        <LoadingCircle />
      ) : (
        <div className="flex flex-col h-full min-h-screen">
          <Header />
          <main className="bg-white flex-grow h-full flex flex-col sm:flex-row">
            <section className="flex flex-grow flex-col w-full sm:flex-grow-0">
              {children}
            </section>
          </main>
        </div>
      )}
    </section>
  );
}
