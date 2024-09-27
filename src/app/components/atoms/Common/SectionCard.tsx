import React from "react";
import { Card } from "primereact/card";

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function SectionCard({ children, id, className }: Props) {
  return (
    <Card
      id={id}
      pt={{
        content: {
          className: "p-0",
        },
        body: {
          className: "p-3 sm:p-5",
        },
      }}
      className={`border rounded-none shadow-none ${className}`}
    >
      {children}
    </Card>
  );
}
