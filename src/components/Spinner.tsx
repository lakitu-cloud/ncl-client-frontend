import React from "react";

interface SpinnerProps {
  size?: string; // Accepts a Tailwind size class (e.g., "h-5 w-5")
  color?: string; // Accepts a Tailwind color class (e.g., "text-white")
  speed?: string; // Accepts a Tailwind animation class (e.g., "animate-spin")
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "h-5 w-5",
  color = "text-white",
  speed = "animate-spin",
}) => {
  return (
    <svg
      className={`${speed} ${size} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={4}
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0116 0H4z"
      ></path>
    </svg>
  );
};

