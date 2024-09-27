import { Image } from "primereact/image";
import React from "react";
import DefaultTemplate from "@/templates/Default/Template";
import SectionsList from "@/molecules/NotFound/SectionsList";

export interface LinkOption {
  title: string;
  url: string;
}

export default function Content() {
  const links: LinkOption[] = [
    {
      title: "Home",
      url: "/dashboard",
    },
    {
      title: "Sign Up",
      url: "/login",
    },
  ];

  return (
    <div className="w-full py-12 px-11 min-h-screen h-full">
      <DefaultTemplate>
        <Image
          alt="logo"
          src="/assets/images/common/name-logo.png"
          className="flex mx-auto w-[165px] mb-6 md:mx-0 lg:mb-[71px]"
        />
        <div className="h-full md:flex md:items-center md:justify-around">
          <div className="text-white flex-1">
            <p className="mb-6 text-[40px]/10 font-bold border-2 border-blue-600 w-fit rounded-[30px] py-2 px-5 mx-auto md:mx-0 lg:text-[80px]/10 lg:py-8 lg:rounded-[60px]">
              Oops!
            </p>
            <p className="text-[28px]/8 font-medium mb-5 lg:text-3xl/8">
              It seems we can’t find the page you’re looking for.
            </p>
            <p className="text-[22px] font-semibold text-[#C4C4C4]">
              Error Code: 404
            </p>
            <p className="font-semibold text-xl mb-5">
              Here are some links that might help:
            </p>
            <hr className="border-blue-600" />
            <SectionsList links={links} />
          </div>
          <Image
            src="/assets/images/NotFound/bg-error.webp"
            className="hidden md:flex md:justify-center md:flex-1"
            alt="404 image"
          />
        </div>
      </DefaultTemplate>
    </div>
  );
}
