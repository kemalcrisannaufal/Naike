import { Dispatch, SetStateAction } from "react";

export type ToasterType = {
  toaster?: {
    variant?: "success" | "error" | "warning" | "custom";
    message?: string;
    image?: string;
    type?: string;
    children?: React.ReactNode;
  };
  setToaster: Dispatch<SetStateAction<object>>;
};
