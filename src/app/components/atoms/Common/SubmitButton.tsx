import React from "react";
import { Button, ButtonProps } from "primereact/button";

interface Props extends ButtonProps {
  children?: React.ReactNode | string;
  className?: string;
  color: "black" | "white";
}

export default function SubmitButton({
  children,
  className,
  color,
  ...props
}: Props) {
  return (
    <Button
      className={`
				text-xs py-1.5 px-6	rounded-md border transition
				sm:text-base sm:py-2.5
				lg:text-lg lg:py-3 lg:px-8
				text-${color == "black" ? "white" : "black"}
				border-${color == "black" ? "white" : "black"}
				bg-${color == "black" ? "black" : "white"} 
				${color == "black" ? "hover:text-black" : "hover:text-white"}	
				${color == "black" ? "hover:border-black" : "hover:border-white"}	
				hover:bg-${color == "black" ? "white" : "black"}
				disabled:opacity-50
        justify-center
				${className}
			`}
      {...props}
    >
      {children}
    </Button>
  );
}
