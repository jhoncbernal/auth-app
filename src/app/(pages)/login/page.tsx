import React from "react";
import LoginPage from "@/pages/Login/Page";
import { metadata as meta } from "@/app/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Ingreso | ${meta.title}`,
}

export default function Login() {
	return <LoginPage />;
}
