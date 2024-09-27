"use client";
import { Provider } from "react-redux";
import store from "@/store/index";

interface Props {
  children: React.ReactNode;
}

export default function Redux({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
