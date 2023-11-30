import React from "react";

interface IconProps {
  color: string;
  width: string;
}

const DownIcon: React.FC<IconProps> = ({ color, width }) => {
  return (
    <svg
      fill={color}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87 87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 345c-9.4 9.4-24.6 9.4-33.9 0L135 241z" />
    </svg>
  );
};

export default DownIcon;
