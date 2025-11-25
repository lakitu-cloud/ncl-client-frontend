// src/assets/Logo.tsx
import React from "react";

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({
  width = "100%",
  height = "auto",
  className = "",
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 623"
      width={width}
      height={height}
      className={className}
      fill={color}
      role="img"
      aria-label="Company Logo"
    >
      <g transform="matrix(1,0,0,1,-0.6060606060606233,0.2522267206477409)">
        {/* Your full cleaned path(s) go here */}
        <path
          d="M10.85 0L3.45 0 3.45-26.25 10.85-26.25 10.85-21.8 11.15-21.8Q11.85-23.85 13.6-25.35 15.35-26.85 18.45-26.85 22.5-26.85 24.58-24.15 26.65-21.45 26.65-16.45L26.65 0 19.25 0 19.25-15.85Q19.25-18.4 18.45-19.63 17.65-20.85 15.6-20.85 14.7-20.85 13.85-20.63 13-20.4 12.33-19.9 11.65-19.4 11.25-18.68 10.85-17.95 10.85-17L10.85 0Z..."
          fill={color}
        />
        {/* Add the rest of your paths here */}
        <path
          d="M226.333 0c68.262 0 123.6 55.338 123.6 123.6 0 68.262-55.338 123.6-123.6 123.6-32.72 0-62.471-12.714-84.581-33.471l7.873 0c20.658 17.599 47.443 28.221 76.708 28.221 65.363 0 118.35-52.987 118.35-118.35 0-65.363-52.987-118.35-118.35-118.35-29.265 0-56.049 10.622-76.708 28.221h-7.873c22.11-20.757 51.861-33.471 84.581-33.471z"
          fill={color}
        />
      </g>
    </svg>
  );
};