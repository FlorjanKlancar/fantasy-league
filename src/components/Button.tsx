import React from "react";

type Props = {
  children: React.ReactNode;
  buttonType: "primary" | "secondary";
  buttonSize: "sm" | "md" | "wide";
  onClick: () => void;
};

function Button({ children, buttonType, buttonSize, onClick }: Props) {
  let buttonStyle;

  switch (buttonType) {
    case "primary":
      buttonStyle = `bg-primary hover:bg-primary/60`;
      break;
    case "secondary":
      buttonStyle = `btn-secondary hover:bg-secondary/60`;
      break;
  }

  return (
    <button
      className={`btn btn-${buttonSize} ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
