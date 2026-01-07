import * as React from "react";

interface SvgProps extends React.SVGProps<SVGSVGElement> {}

function SvgComponent(props: SvgProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <rect
        width={24}
        height={24}
        rx={4}
        fill="#A5A5A5"
        fillOpacity={isHovered ? 0.12 : 0}
        style={{ transition: "fill-opacity 0.2s" }}
      />
      <path
        d="M9 4.46A9.8 9.8 0 0112 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20c-4.182 0-7.028-2.5-8.725-4.704C2.425 14.192 2 13.64 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 015 6.821"
        stroke="#A5A5A5"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="#A5A5A5" strokeWidth={1.5} />
    </svg>
  );
}

export default SvgComponent;
