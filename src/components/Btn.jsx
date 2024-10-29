import React from "react";

export default function Btn({
  type = "button",
  className,
  bgColor = "bg-white",
  name,
  ...props
}) {
  return (
    <button className={`${bgColor} ${className}`} {...props}>
      {name}
    </button>
  );
}
