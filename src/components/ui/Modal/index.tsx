/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
type Proptypes = {
  children: React.ReactNode;
  onClose: any;
};

const Modal = (props: Proptypes) => {
  const { children, onClose } = props;
  const ref: any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="top-0 fixed flex justify-center items-center bg-black/50 w-screen h-screen">
      <div
        className="bg-white p-5 rounded w-sm md:w-md lg:w-2xl max-h-[80vh] overflow-y-scroll scrollbar-hide"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
