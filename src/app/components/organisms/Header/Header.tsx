"use client";
import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { MenuItem } from "primereact/menuitem";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/common/name-logo.png";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import UserDropdown from "@/molecules/Header/UserDropdown";
import UserBadgeMobile from "@/molecules/Header/UserBadgeMobile";

export default function Header() {
  const { data: session } = useSession();
  const path = usePathname();

  const itemRenderer = (item: MenuItem) => {
    if (item.label === "userMenu") {
      return <UserBadgeMobile userData={session?.user} />;
    } else {
      return (
        <Link
          className={`flex items-center my-1 py-2 px-4 min-[769px]:px-2 overflow-hidden relative
						hover:surface-ground ${path === item.url ? "font-bold text-black" : ""}`}
          href={item.url ? item.url : "/dashboard"}
        >
          <span>{item.label}</span>
        </Link>
      );
    }
  };

  const items: MenuItem[] = [
    {
      label: "Home",
      url: "/dashboard",
      template: itemRenderer,
    },

    {
      label: "userMenu",
      template: itemRenderer,
    },
    {
      className: `${!session && "hidden"} min-[769px]:hidden`,
      label: "Dashboard",
      icon: "pi pi-user",
      url: "/dashboard",
    },
    {
      className: `${!session && "hidden"} min-[769px]:hidden`,
      label: "Logout",
      icon: "pi pi-sign-out",
      command() {
        signOut({
          callbackUrl: "/login",
        });
      },
    },
  ];

  const start = (
    <Link href={"/dashboard"} className="me-auto">
      <Image src={Logo} alt="logo" width={175} priority />
    </Link>
  );

  return (
    <header className="bg-white border-b h-[70px] shadow-md">
      <MegaMenu
        pt={{
          start: {
            className: "max-[768px]:mx-auto min-[769px]:mr-auto",
          },
          end: {
            className: "max-[768px]:hidden min-[769px]:flex min-[768px]:ml-5",
          },
        }}
        model={items}
        orientation="horizontal"
        start={start}
        end={<UserDropdown />}
        breakpoint="768px"
        className="flex p-3 max-w-7xl bg-white h-full m-auto border-none rounded-none surface-0"
      />
    </header>
  );
}
