import React, { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  color: "white" | "black";
  className?: string;
}

export default function Label({ text, color, className, ...props }: Props) {
  return (
    <label
      className={`text-sm sm:text-base lg:text-lg text-${color} ${className}`}
      {...props}
    >
      {text}
    </label>
  );
}
