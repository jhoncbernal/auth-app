import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
}

export default function DefaultTemplate({ children, className, childrenClassName }: Props) {
  return (
    <div className={`container max-w-7xl m-auto ${className}`}>
      <div className={`m-4 ${childrenClassName}`}>{children}</div>
    </div>
  );
}
