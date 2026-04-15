import { ArrowRight, Plane } from "lucide-react";
import React from "react";

export const QuickActionButton = ({
  heading,
  subHeading,
  icon: Icon,
  className,
  onClick,
}) => {
  return (
    <button
      className={`group cursor-pointer flex items-center justify-between gap-2 bg-blue-500 p-4 rounded-xl w-full max-w-[300px] min-w-[270px] active:scale-98 transition-all max-md:max-w-full ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="box-content bg-white/30 p-2 rounded-lg text-white" />
        <div className="flex flex-col gap-1 items-start">
          <h4 className="font-semibold text-white">{heading}</h4>
          <p className="text-xs text-white/80">{subHeading}</p>
        </div>
      </div>
      <ArrowRight className="mr-2 text-white group-hover:animate-bounce" />
    </button>
  );
};
