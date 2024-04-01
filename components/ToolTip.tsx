import { ToolTipProps } from "@/interfaces";
import { useState } from "react";

const tooltipStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  opacity: "0.8",
};

const tooltipTextStyle: React.CSSProperties = {
  visibility: "hidden",
  width: "220px",
  backgroundColor: "black",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "5px 0",

  /* Position the tooltip text */
  position: "absolute",
  zIndex: "1",
  bottom: "100%",
  left: "50%",
  marginLeft: "-110px", // Half of the width to center it

  /* Fade in tooltip - animation */
  opacity: "0",
  transition: "opacity 0.3s",
};

const tooltipTextHoverStyle: React.CSSProperties = {
  visibility: "visible",
  opacity: "1",
};

// Tooltip Component
const ToolTip = ({ children, text }: ToolTipProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      style={tooltipStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      <div
        style={
          isHovering
            ? { ...tooltipTextStyle, ...tooltipTextHoverStyle }
            : tooltipTextStyle
        }
      >
        {text}
      </div>
    </div>
  );
};

export default ToolTip;
