import React from "react";

interface Props {
  title?: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  children,
  className,
  titleClassName,
}: Props) {
  return children ? (
    <div className={`${className}`}>{children}</div>
  ) : (
    <div className={`${className}`}>
      <h2
        className={`text-xs sm:text-lg/6 lg:text-xl font-bold text-gray-950 ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[10px] sm:text-sm/5 lg:text-base sm:leading-5">
          {subtitle}
        </p>
      )}
    </div>
  );
}
