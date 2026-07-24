import React from "react";

export default function InputField({
  type = "text",
  placeholder,
  leftIcon,
  rightIcon,
  error,
  className = "",
  onRightIconClick,
  ...props
}) {
  return (
    <div className="mb-1"> {/* Reduced bottom margin for tighter spacing */}
      <div
        className={`flex items-center border rounded-lg px-3 py-2 transition-colors duration-200 ${
          error ? "border-red-500" : "border-blue-600 hover:border-blue-400"
        } ${className}`}
      >
        {/* Left icon */}
        {leftIcon && (
          <span
            className={`mr-2 flex-shrink-0 transition-colors duration-200 ${
              error ? "text-red-500" : "text-blue-400"
            }`}
          >
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          className={`flex-1 outline-none bg-transparent text-gray-100 ${
            error
              ? "text-red-500 placeholder-red-400"
              : "text-gray-100 placeholder-blue-300"
          }`}
          {...props}
        />

        {/* Right icon with click */}
        {rightIcon && (
          <span
            className={`ml-2 flex-shrink-0 cursor-pointer transition-colors duration-200 ${
              error ? "text-red-500" : "text-blue-400"
            }`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {/* Error message space reserved */}
      <p className="text-red-500 text-xs mt-0.5 mb-0.5 min-h-[1rem]">
        {error || "\u00A0"}
      </p>
    </div>
  );
}
