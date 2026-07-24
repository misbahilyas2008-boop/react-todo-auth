import * as React from "react";

const MailIcon = ({width = 21,height = 18,color = "#807A7A"}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 21 18"
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m15.607 6.306-4.009 3.148c-.759.58-1.822.58-2.58 0L4.973 6.306"
    ></path>
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5.852 1.208h8.86a4.71 4.71 0 0 1 3.365 1.458 4.53 4.53 0 0 1 1.246 3.395v5.984a4.53 4.53 0 0 1-1.246 3.395 4.71 4.71 0 0 1-3.365 1.458h-8.86c-2.744 0-4.594-2.177-4.594-4.853V6.061c0-2.675 1.85-4.853 4.594-4.853"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default MailIcon;