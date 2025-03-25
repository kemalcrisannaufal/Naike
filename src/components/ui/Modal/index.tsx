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
    <div className="top-0 z-50 fixed flex justify-center items-center bg-black/50 p-5 w-screen h-screen">
      <div
        className="relative bg-white p-5 rounded-xl w-sm md:w-md lg:w-2xl max-h-[80vh] overflow-y-scroll scrollbar-hide"
        ref={ref}
      >
        <button
          className="block top-5 right-5 absolute"
          onClick={onClose}
          type="button"
        >
          <i className="block bg-neutral-200 m-0 p-1 rounded-full text-2xl cursor-pointer bx bx-x" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
