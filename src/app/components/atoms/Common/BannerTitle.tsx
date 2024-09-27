import React from "react"

interface Props {
	children: React.ReactNode;
	color: "white" | "black";
	className?: string;
}

export default function BannerTitle({ children, color, className }: Props) {
	return (
		<h1 
			className={`text-lg leading-6 sm:text-2xl
			lg:text-4xl lg:leading-tight text-${color} font-bold ${className}`}
		>
			{children}
		</h1>
	);
}
