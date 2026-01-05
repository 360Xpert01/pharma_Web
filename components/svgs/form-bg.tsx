import * as React from "react";

interface SvgProps extends React.SVGProps<SVGSVGElement> {}

function SvgComponent(props: SvgProps) {
  return (
    <svg
      width={851}
      height={993}
      viewBox="0 0 851 993"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M267.741 28.265A58 58 0 01316.953-.499L874.682 -8.111L874.682 993H205.461c-24.814 0-46.879-15.785-54.892-39.27L3.108 521.575a58 58 0 014.795-47.959l259.838-445.35z"
        fill="url(#paint0_linear_10450_4925)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10450_4925"
          x1={35.2215}
          y1={993}
          x2={671.417}
          y2={497.212}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F72F4" />
          <stop offset={1} stopColor="#7B7BF1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgComponent;
