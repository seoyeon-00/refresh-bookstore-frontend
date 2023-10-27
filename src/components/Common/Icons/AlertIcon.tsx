import React from "react";

interface AlertProps {
  width: string;
  color: string;
}

const AlertIcon: React.FC<AlertProps> = ({ width, color }) => {
  return (
    <svg
      width={width}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2C6.486 2 2 6.486 2 12ZM4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12ZM11.5 13C11.2239 13 11 12.7761 11 12.5V7.5C11 7.22386 11.2239 7 11.5 7H12.5C12.7761 7 13 7.22386 13 7.5V12.5C13 12.7761 12.7761 13 12.5 13H11.5ZM11.5 17C11.2239 17 11 16.7761 11 16.5V15.5C11 15.2239 11.2239 15 11.5 15H12.5C12.7761 15 13 15.2239 13 15.5V16.5C13 16.7761 12.7761 17 12.5 17H11.5Z"></path>
    </svg>
  );
};

export default AlertIcon;
