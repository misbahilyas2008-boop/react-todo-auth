import React from "react";
import { ClipLoader, BeatLoader, PulseLoader } from "react-spinners";

/**
 * Loading Spinner component
 * size: "sm" | "md" | "lg"
 * variant: "white" | "blue" | "gray"
 * type: "clip" | "beat" | "pulse"
 */
const LoadingSpinner = ({
  size = "md",
  variant = "white",
  type = "clip",
  className = "",
}) => {
  const sizeMap = { sm: 12, md: 18, lg: 28 };
  const colorMap = {
    white: "#ffffff",
    blue: "#3B82F6",
    gray: "#9CA3AF",
  };

  const spinnerProps = {
    size: sizeMap[size] || 18,
    color: colorMap[variant] || "#ffffff",
    className,
  };

  switch (type) {
    case "beat":
      return <BeatLoader {...spinnerProps} />;
    case "pulse":
      return <PulseLoader {...spinnerProps} />;
    default:
      return <ClipLoader {...spinnerProps} />;
  }
};

export default LoadingSpinner;
