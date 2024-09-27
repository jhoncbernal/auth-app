"use client";
import React, { useRef, createContext, useContext } from "react";
import { Toast, ToastMessage } from "primereact/toast";

interface ToastProps extends ToastMessage {
  type: "success" | "info" | "warn" | "error" | undefined;
  title: string;
  message: string;
}

interface ToastContextData {
  showToast: ({}: ToastProps) => void;
}

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const toast = useRef<Toast>(null);

  const showToast = ({ type, title, message, ...props }: ToastProps) => {
    toast.current?.show({
      severity: type,
      summary: title,
      detail: message,
      ...props,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast ref={toast} className="w-80" />}
    </ToastContext.Provider>
  );
};
