import Link from "next/link";
import React from "react";
import { LinkOption } from "@/organisms/NotFound/Content";

interface Props {
  links: LinkOption[];
}

export default function SectionsList({ links }: Props) {
  return (
    <ul className="text-[#3EA8D6] font-semibold text-xl/8 py-5">
      {links.map((link, i) => {
        return (
          <li key={i}>
            <Link href={link.url}>{link.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
