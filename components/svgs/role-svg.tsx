import React from "react";

interface RoleSvgProps {
  width?: number;
  height?: number;
  className?: string;
}

const RoleSvg: React.FC<RoleSvgProps> = ({ width = 25, height = 25, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.094 8.15a3.056 3.056 0 100-6.112 3.056 3.056 0 000 6.112zM19.357 15.282a3.056 3.056 0 100-6.113 3.056 3.056 0 000 6.113zM5.094 22.413a3.056 3.056 0 100-6.113 3.056 3.056 0 000 6.113z"
        stroke="currentColor"
        strokeWidth={1.09908}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.3 12.226H9.17c-2.241 0-4.075-1.02-4.075-4.076v8.15"
        stroke="currentColor"
        strokeWidth={1.09908}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RoleSvg;
