import * as React from "react";

const ProfileIcon = ({ width = 20, height = 20, color = "#807A7A", ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse
      cx={10.6142}
      cy={6.67153}
      rx={4.37986}
      ry={4.37986}
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.66676 17.1429C3.66559 16.835 3.73445 16.5309 3.86814 16.2535C4.28766 15.4145 5.47073 14.9698 6.45242 14.7684C7.16042 14.6173 7.87819 14.5164 8.6004 14.4664C9.93752 14.3489 11.2824 14.3489 12.6195 14.4664C13.3416 14.517 14.0594 14.6179 14.7674 14.7684C15.7491 14.9698 16.9322 15.3725 17.3517 16.2535C17.6206 16.8189 17.6206 17.4753 17.3517 18.0407C16.9322 18.9217 15.7491 19.3245 14.7674 19.5175C14.0603 19.6748 13.3423 19.7786 12.6195 19.8279C11.5312 19.9202 10.4378 19.937 9.34716 19.8783C9.09544 19.8783 8.85212 19.8783 8.6004 19.8279C7.88033 19.7792 7.16504 19.6754 6.46081 19.5175C5.47073 19.3245 4.29605 18.9217 3.86814 18.0407C3.73513 17.7601 3.66634 17.4534 3.66676 17.1429Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ProfileIcon;
