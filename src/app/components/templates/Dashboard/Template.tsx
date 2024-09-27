import React from "react";
import Header from "@/organisms/Header/Header";


interface Props {
  children: React.ReactNode;
}

export default function DashboardTemplate({ children }: Props) {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <Header />
      <main className="bg-white flex-grow h-full flex flex-col sm:flex-row">
        <section className="flex flex-grow flex-col w-full sm:flex-grow-0">
          {children}
        </section>
      </main>
    </div>
  );
}
