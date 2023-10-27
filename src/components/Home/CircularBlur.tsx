import React from "react";
import { EnumType } from "typescript";

interface CircularBlurType {
  width: string;
  blur: string;
  color: string;
}

const CircularBlur: React.FC<CircularBlurType> = ({ width, blur, color }) => {
  return (
    <div
      className={`w-[${width}] h-[${width}] rounded-circle bg-[${color}] backdrop-filter backdrop-blur-${blur}`}
    ></div>
  );
};

export default CircularBlur;
