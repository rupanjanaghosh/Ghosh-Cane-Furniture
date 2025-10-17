import React from "react";

const Title = ({ text1, text2, color1 = "#df8340", color2 = "#873e23" }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        <span style={{ color: color1 }}>{text1}</span>{" "}
        <span className="text-gray-700 font-medium" style={{ color: color2 }}>
          {text2}
        </span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;