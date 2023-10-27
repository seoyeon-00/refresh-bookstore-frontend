import React from "react";

const RefreshAnimation = () => {
  return (
    <div className="w-full h-[500px] flex flex-row justify-start items-center">
      <div className="absolute rounded-full w-[800px] right-0 h-[800px] blur-xl bg-[#48e59a] animate-[move1_15s_linear_infinite_alternate]"></div>
      <div className="absolute rounded-full left-[30%] w-[800px] h-[800px] bg-[#97ffcb] animate-[move4_18s_linear_infinite_alternate]"></div>
      <div className="absolute rounded-full left-0 w-[700px] h-[700px] blur-2xl bg-[#63e0a2] animate-[move3_14s_linear_infinite_alternate] "></div>
      <div className="absolute rounded-full right-[30%] w-[600px] h-[600px] blur-2xl bg-[#5deda5] animate-[move2_11s_linear_infinite_alternate] "></div>
      <div className="absolute rounded-full left-[5%] w-[600px] h-[600px] blur-lg  bg-light_green animate-[move1_12s_linear_infinite_alternate] "></div>
    </div>
  );
};

export default RefreshAnimation;
