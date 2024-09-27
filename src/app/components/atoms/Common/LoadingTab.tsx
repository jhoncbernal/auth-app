import React from "react";
import { ProgressBar } from "primereact/progressbar";

export default function LoadingTab() {
  return (
    <div className="p-4">
      <ProgressBar mode="indeterminate" className="h-2" color="#222" />
    </div>
  );
}
