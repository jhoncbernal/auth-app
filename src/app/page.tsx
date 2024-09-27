import { Metadata } from "next";
import Login from "./(pages)/login/page";

export const metadata: Metadata = {
  title: "Pelmorex - Welcome",
  description:
    "Welcome",
};

export default function Home() {
  return <Login/>;
}
