import * as React from "react";

const PasswordLock = ({ width, height, color, style }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M15.8133 8.66048V6.6924C15.8133 4.38881 13.8979 2.52065 11.5362 2.52065C9.1745 2.51056 7.25167 4.36956 7.24133 6.67406V6.6924V8.66048"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1176 19.4788H7.93659C5.96864 19.4788 4.37286 17.9232 4.37286 16.0028V12.0712C4.37286 10.1508 5.96864 8.59521 7.93659 8.59521H15.1176C17.0855 8.59521 18.6813 10.1508 18.6813 12.0712V16.0028C18.6813 17.9232 17.0855 19.4788 15.1176 19.4788Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5273 13.0191V15.0551"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PasswordLock;
