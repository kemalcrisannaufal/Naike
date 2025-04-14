import { Dispatch, SetStateAction } from "react";

export type ToasterType = {
  toaster?: {
    variant?: "success" | "error" | "warning";
    message?: string;
  };
  setToaster: Dispatch<SetStateAction<object>>;
};
