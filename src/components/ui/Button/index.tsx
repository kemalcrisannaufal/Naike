import React from "react";

type Proptypes = {
  type?: "submit" | "reset" | "button";
  children: React.ReactNode;
  onClick?: () => void;
  classname?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

const Button = (props: Proptypes) => {
  const {
    type = "button",
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
      className={`p-2 px-3 text-sm lg:text-md font-semibold rounded cursor-pointer flex gap-2 justify-center items-center focus:outline-none  
        ${
          variant === "primary"
            ? "bg-primary text-white"
            : "bg-neutral-200 text-black"
        }
  ${
    variant === "primary" &&
    !disabled &&
    " hover:bg-neutral-500 transition-all ease-in-out duration-100"
  }  
  ${
    variant === "secondary" &&
    !disabled &&
    " hover:bg-neutral-300 transition-all ease-in-out duration-100"
  }
  ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${classname}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
