import * as React from "react";

interface SvgProps extends React.SVGProps<SVGSVGElement> {}

function SvgComponent(props: SvgProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <rect
        width={32}
        height={32}
        rx={4.26667}
        fill="#FF0500"
        fillOpacity={isHovered ? 0.12 : 0}
        style={{ transition: "fill-opacity 0.2s" }}
      />
      <path
        d="M25.121 9.9a103.06 103.06 0 00-10.154-.507c-2.006 0-4.013.101-6.019.304L6.881 9.9M12.453 8.876l.223-1.327c.162-.963.284-1.682 1.996-1.682h2.655c1.713 0 1.845.76 1.997 1.692l.223 1.317M22.942 13.102l-.66 10.204c-.11 1.591-.202 2.828-3.03 2.828h-6.505c-2.827 0-2.918-1.237-3.03-2.828L9.06 13.102M14.309 20.56h3.374M13.467 16.507h5.067"
        stroke="#E02723"
        strokeWidth={1.52003}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
