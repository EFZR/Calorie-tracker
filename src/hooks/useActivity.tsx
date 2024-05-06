import { useContext } from "react";
import {
  ActivityContext,
  ActivityContextProps,
} from "../context/ActivityContext";

export default function useActivity(): ActivityContextProps {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }

  return context;
}
