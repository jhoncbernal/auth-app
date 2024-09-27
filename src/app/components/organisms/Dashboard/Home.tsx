import React from "react";
import LoadingTab from "@/atoms/Common/LoadingTab";
import { useSession } from "next-auth/react";
import Typography from "@/atoms/Common/Typography";

export default function Home() {
  const { status, data: session } = useSession();

  const userName = session?.user?.name || "User";

  return (
    <section className="bg-white p-3.5">
      {status === "loading" ? (
        <LoadingTab />
      ) : (
        <div className="flex flex-wrap">
          <Typography
            type="h1"
            color="black"
            text={`Welcome back, ${userName}`}
            className="p-float-label w-full mb-1 lg:px-3"
          />
        </div>
      )}
    </section>
  );
}
