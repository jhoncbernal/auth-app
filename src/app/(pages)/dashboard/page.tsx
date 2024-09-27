import DashboardPage from "@/pages/Dashboard/Page";
import { metadata as meta } from "@/app/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | ${meta.title}`,
};

export default function Dashboard() {
  return <DashboardPage />;
}
