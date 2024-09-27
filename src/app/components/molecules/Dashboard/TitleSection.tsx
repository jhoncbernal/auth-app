import React from "react";

interface Props {
  title: string;
}

export default function TitleSection({ title }: Props) {
  return (
    <div className="border-b border-b-gray-400 h-16 p-4">
      <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
    </div>
  );
}
