import React from 'react';

interface IconProps {
  svgPath: string;
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const Icon: React.FC<IconProps> = ({
  svgPath,
  width = 16,
  height = 16,
  color = "currentColor",
  style = {},
  className = "",
  onClick,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
    className={className}
    onClick={onClick}
    {...props}
  >
    <path 
      d={svgPath} 
      fill={color} 
    />
  </svg>
);

export default Icon;
