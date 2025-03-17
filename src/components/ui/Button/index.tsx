import React from "react";

type Proptypes = {
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  onClick?: () => void;
  classname?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

const Button = (props: Proptypes) => {
  const {
    type,
    children,
    variant = "primary",
    onClick,
    classname,
    disabled,
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-2 px-3 text-sm lg:text-md font-semibold rounded cursor-pointer flex gap-2 justify-center items-center 
  ${
    variant === "primary"
      ? "bg-primary text-white hover:bg-blue-800 transition-all ease-in-out duration-100"
      : "bg-white text-primary hover:bg-neutral-200 transition-all ease-in-out duration-100 p-2"
  } 
  ${classname} 
  ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
