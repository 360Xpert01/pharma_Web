import * as React from "react";

interface SvgProps extends React.SVGProps<SVGSVGElement> {}

function SvgComponent(props: SvgProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <rect
        width={23}
        height={23}
        rx={3.33333}
        fill="#0F72F4"
        fillOpacity={isHovered ? 0.12 : 0}
        style={{ transition: "fill-opacity 0.2s" }}
      />
      <path
        d="M9.442 10.792a1.517 1.517 0 00-.444 1.073V14h2.148c.402 0 .79-.16 1.074-.445l6.333-6.336a1.518 1.518 0 000-2.147l-.626-.626a1.517 1.517 0 00-2.148 0l-6.337 6.346z"
        stroke="#0F72F4"
        strokeWidth={1.19}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.998 11.5c0 3.536 0 5.303-1.098 6.401C16.802 19 15.034 19 11.499 19c-3.535 0-5.303 0-6.4-1.099C4 16.803 4 15.035 4 11.501 4 7.966 4 6.198 5.098 5.1 6.196 4 7.964 4 11.5 4"
        stroke="#0F72F4"
        strokeWidth={1.19}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
