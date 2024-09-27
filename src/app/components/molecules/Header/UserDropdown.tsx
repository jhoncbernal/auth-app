import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import Typography from "@/atoms/Common/Typography";
import { MenuItem } from "primereact/menuitem";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "primereact/skeleton";

export default function UserDropdown() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const menuRight: any = useRef(null);
  const items: MenuItem[] = [
    {
      label: session?.user?.name || "User Menu",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-user",
          url: "/dashboard",
        },
        {
          label: "Sign out",
          icon: "pi pi-sign-out",
          command() {
            signOut({
              callbackUrl: "/login",
            });
          },
        },
      ],
    },
  ];

  if (status === "loading") {
    return (
      <div className="flex items-center">
        <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
        <Skeleton width="4rem" height=".8rem"></Skeleton>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center">
        <button
          className="flex items-center"
          aria-label="Show Righ"
          onClick={(event) => menuRight.current.toggle(event)}
          aria-controls="popup_menu_right"
          aria-haspopup
        >
          <Avatar
            image={
              session?.user?.image ||
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"
            }
            size="normal"
            shape="circle"
            className="me-2"
          />
          <Typography
            color="black"
            text={session?.user?.name?.split(" ").slice(0, 2).join(" ") || ""}
          />
        </button>
        <Menu
          model={items}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
      </div>
    );
  } else {
    return (
      <button
        onClick={() => router.push("/login")}
        className="bg-black text-white leading-4 rounded-md py-2 px-3 border border-black transition-all
         hover:bg-white hover:text-black"
      >
        Log in
      </button>
    );
  }
}
