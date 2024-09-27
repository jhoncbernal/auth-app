import React from "react";
import Link from "next/link";
import { Avatar } from "primereact/avatar";


interface Props {
  userData: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | undefined
}
export default function UserBadgeMobile({ userData }: Props) {
  if(userData) {
    return (
      <div className="flex items-center my-2 mx-1 py-1 px-2 min-[769px]:hidden">
        <Avatar 
          image={userData?.image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"}
          size="normal"
          shape="circle" 
          className="me-2"
        />
        <div>
          <p className="leading-4">{userData?.name || ""}</p>
          <p className="leading-3 text-xs text-gray-400">{userData?.email}</p>
        </div>
      </div>
    );
  } else {
    return (
      <Link
        href="/login"
        className="flex items-center my-2 mx-1 py-1 px-2 min-[769px]:hidden"
      >
        Log in
      </Link>
    );
  }
}
