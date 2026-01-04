import * as React from "react";

interface SvgProps extends React.SVGProps<SVGSVGElement> {}

function SvgComponent(props: SvgProps) {
  return (
    <svg
      width={125}
      height={1}
      viewBox="0 0 125 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path transform="scale(1 -1)" stroke="url(#paint0_linear_10453_5479)" d="M0 -0.5L125 -0.5" />
      <defs>
        <linearGradient
          id="paint0_linear_10453_5479"
          x1={125}
          y1={0.5}
          x2={0}
          y2={0.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#0F72F4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgComponent;
