/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToasterContext } from "@/contexts/ToasterContext";
import { ToasterType } from "@/types/toaster.type";
import { useContext, useEffect, useRef, useState } from "react";

const toasterVariant = {
  custom: {
    title: "Custom",
    icon: "bx-check-circle",
    color: "text-green-600",
    barColor: "bg-slate-800",
  },
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "text-green-600",
    barColor: "bg-green-800",
  },
  error: {
    title: "Error",
    icon: "bx-error-circle",
    color: "text-red-600",
    barColor: "bg-red-600",
  },
  warning: {
    title: "Warning",
    icon: "bx-error-alt",
    color: "text-yellow-600",
    barColor: "bg-yellow-800",
  },
};

const Toaster = () => {
  const { toaster, setToaster }: ToasterType = useContext(ToasterContext);
  const variantStyle = toasterVariant[toaster.variant || "success"];
  const [lengthBar, setLengthBar] = useState(100);
  const timeRef = useRef<any>(null);

  const timerStart = () => {
    timeRef.current = setInterval(() => {
      setLengthBar((prevLength) => prevLength - 0.1);
    });
  };

  useEffect(() => {
    timerStart();
    return () => clearInterval(timeRef.current);
  }, []);

  useEffect(() => {
    if (lengthBar <= 0) {
      setToaster({});
    }
  }, [lengthBar, setToaster]);

  return (
    <div
      className={`fixed z-50 left-1/2 -translate-x-1/2 bottom-4 md:left-auto md:translate-x-0 md:right-4 md:top-24 md:h-auto flex bg-white px-4 py-2 shadow-xl rounded-lg overflow-hidden border border-neutral-200 max-w-xs md:max-w-sm md:max-h-fit`}
    >
      {toaster.variant === "custom" ? (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <i
              className={`text-xl bx ${variantStyle.icon} ${variantStyle.color}`}
            />
            <p className="font-medium text-sm tracking-tight">
              {toaster.message}
            </p>
          </div>
          {toaster.children}
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 p-2">
            <i
              className={`text-3xl bx ${variantStyle.icon} ${variantStyle.color}`}
            />
            <div>
              <p className="font-bold text-neutral-700">{variantStyle.title}</p>
              <p className="font-medium text-neutral-700 text-sm">
                {toaster.message || "No message provided"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Close */}
      <button
        className="top-2 right-2 absolute flex bg-neutral-200 rounded-full cursor-pointer"
        onClick={() => setToaster({})}
      >
        <i className="text-lg bx bx-x" />
      </button>
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
