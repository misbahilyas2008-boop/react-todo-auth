import React from "react";

export default function Button({
  variant = "filled",
  children,
  onClick,
  leftIcon,
  disabled = false,
  className = "",
}) {
  const baseClasses =
    "px-5 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 transform";

  const variantClasses =
    variant === "filled"
      ? `bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
         text-white shadow-lg hover:shadow-xl hover:scale-105
         disabled:opacity-50 disabled:cursor-not-allowed`
      : `border border-blue-500 text-blue-500  cursor-pointer hover:scale-105
         disabled:border-gray-300 disabled:text-gray-400 disabled:opacity-50`;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon && <span className="text-xl">{leftIcon}</span>}
      <span>{children}</span>
    </button>
  );
}
