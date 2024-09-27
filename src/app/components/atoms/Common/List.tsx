import React from "react";

interface Props {
  type: "ul" | "ol";
  color: "white" | "black";
  items: React.ReactNode[];
  className?: string;
}

export default function List({ type, color, items, className }: Props) {
  const Tag = type;

  return (
    <Tag className={`text-sm text-${color} ${className}`}>
      {items.map((item, i) => {
        return <li key={i}>{item}</li>;
      })}
    </Tag>
  );
}
