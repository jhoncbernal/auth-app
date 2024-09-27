import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export default function LoadingCircle() {
  return (
    <div className="flex items-center justify-center h-screen">
			<ProgressSpinner />
    </div>
  );
}