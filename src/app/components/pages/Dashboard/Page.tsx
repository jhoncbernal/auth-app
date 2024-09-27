"use client";
import DashboardTemplate from "@/templates/Dashboard/Template";
import DashboardHome from "@/organisms/Dashboard/Home";
import TitleSection from "@/molecules/Dashboard/TitleSection";

export default function DashboardPage() {
  return (
    <DashboardTemplate>
      <>
        <TitleSection title="Home" />
        <DashboardHome />
      </>
    </DashboardTemplate>
  );
}
