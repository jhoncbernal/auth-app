"use client";
import React, { useState } from "react";
import LoginTemplate from "@/templates/Login/Template";
import LoginForm from "@/app/components/organisms/Login/Login";

export default function Login() {
  const [visibleRegister, setVisibleRegister] = useState(false);

  return (
    <LoginTemplate
      visibleRegister={visibleRegister}
      setVisibleRegister={setVisibleRegister}
    >
      <LoginForm setVisibleRegister={setVisibleRegister} />
    </LoginTemplate>
  );
}
