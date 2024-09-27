import React from "react";
import { PrimeReactProvider, APIOptions } from "primereact/api";

interface Props {
  children: React.ReactNode;
}

export const theme: APIOptions = {
  pt: {
    button: {
      root: {
        className: "py-1 text-sm",
      },
      icon: {
        className: "text-sm",
      },
    },
  },
};

export const PrimeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        const style = document.createElement('style')
        style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
        style.setAttribute('type', 'text/css')
        document.querySelector('head').prepend(style)
      `,
    }}
  />
);

export default function Prime({ children }: Props) {
  return <PrimeReactProvider value={theme}>{children}</PrimeReactProvider>;
}
