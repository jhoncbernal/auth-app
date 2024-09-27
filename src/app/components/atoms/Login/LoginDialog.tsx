import React from "react";
import { Dialog } from "primereact/dialog";

interface Props {
  children: React.ReactNode;
  visible: boolean;
  setVisible(visible: boolean): void;
  closeButtonStyle?: string;
  className?: string;
  closeable?: boolean;
}

export default function LoginDialog({
  children,
  visible,
  setVisible,
  closeButtonStyle,
  className,
  closeable = true,
}: Props) {
  return (
    <Dialog
      visible={visible}
      className={`max-w-[370px] sm:max-w-[707px] mx-5`}
      onHide={() => setVisible(false)}
      closable={closeable}
      pt={{
        header: {
          className: "bg-black pb-0",
        },
        footer: {
          className: "bg-black",
        },
        content: {
          className: `${className} bg-black px-10`,
        },
        closeButton: {
          className: `text-white hover:text-black ${closeButtonStyle}`,
        },
      }}
    >
      {children}
    </Dialog>
  );
}
