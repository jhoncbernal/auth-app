import React from "react";

interface Props {
  type?: "h1" | "h2" | "h3" | "h4" | "h5";
  text: string;
  color: "white" | "black";
  className?: string;
}

export default function Typography({ type, text, color, className }: Props) {
  const Tag = type;

  return Tag ? (
    <Tag
      className={`text-base leading-5 font-bold sm:leading-5 sm:text-lg lg:text-xl text-${color} ${className}`}
    >
      {text}
    </Tag>
  ) : (
    <p
      className={`text-sm font-normal sm:text-base lg:text-lg text-${color} ${className}`}
    >
      {text}
    </p>
  );
}
