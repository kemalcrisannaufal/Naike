/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
type Proptypes = {
  classname?: string;
  variant: "success" | "error" | "warning";
  message?: string;
  setToaster: Dispatch<SetStateAction<object>>;
};

const toasterVariant = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "text-green-600",
    barColor: "bg-green-800",
  },
  error: {
    title: "Error",
    icon: "bx-error",
    color: "text-red-600",
    barColor: "bg-red-800",
  },
  warning: {
    title: "Warning",
    icon: "bx-error-alt",
    color: "text-yellow-600",
    barColor: "bg-yellow-800",
  },
};

const Toaster = (props: Proptypes) => {
  const { variant = "success", classname, message, setToaster } = props;
  const variantStyle = toasterVariant[variant] || toasterVariant.success;
  const [lengthBar, setLengthBar] = useState(100);
  const timeRef = useRef<any>(null);

  const timerStart = () => {
    timeRef.current = setInterval(() => {
      setLengthBar((prevLength) => prevLength - 0.17);
    });
  };

  useEffect(() => {
    timerStart();
    return () => clearInterval(timeRef.current);
  }, []);

  return (
    <div
      className={`fixed z-50 left-1/2 -translate-x-1/2 bottom-4 flex bg-white px-4 py-2 shadow-xl rounded overflow-hidden border border-neutral-200 ${classname}`}
    >
      <div className="flex items-center gap-3 p-2">
        <i
          className={`bx ${variantStyle.icon} text-2xl ${variantStyle.color}`}
        />
        <div>
          <p className="font-bold text-neutral-700">{variantStyle.title}</p>
          <p className="font-medium text-neutral-700 text-sm">
            {message || "No message provided"}
          </p>
        </div>

        <button
          className="top-4 right-2 absolute text-neutral-500 hover:text-neutral-700 cursor-pointer"
          onClick={() => setToaster({})}
        >
          <i className="text-lg bx bx-x"></i>
        </button>
      </div>

      <div className="bottom-0 left-0 absolute w-full h-1">
        <div
          className={`h-full ${variantStyle.barColor}`}
          style={{ width: `${lengthBar}%` }}
        />
      </div>
    </div>
  );
};

export default Toaster;
