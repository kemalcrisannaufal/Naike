import React from "react";

type Proptypes = {
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  onClick?: () => void;
  classname?: string;
};

const Button = (props: Proptypes) => {
  const { type, children, onClick, classname } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-indigo-700 text-white font-semibold rounded p-2 cursor-pointer text-sm lg:text-md flex gap-2 justify-center items-center ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
