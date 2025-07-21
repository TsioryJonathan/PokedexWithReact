import { useEffect, useRef } from "react";
import { useToast } from "./ToastContext";
import useNetworkQuality from "@/hooks/useNetworkQuality";

export default function NetworkStatusNotifier() {
  const { showToast } = useToast();
  const lastStatus = useRef();
  const status = useNetworkQuality();

  useEffect(() => {
    if (lastStatus.current !== status) {
      if (status === "offline") {
        showToast({ message: "You are offline. Some features may not work.", type: "error" });
      } else if (status === "weak") {
        showToast({ message: "Your network connection is weak.", type: "warning" });
      } else if (status === "online") {
        showToast({ message: "You are back online.", type: "success" });
      } else if (status === "strong") {
        showToast({ message: "Your connection is strong!", type: "info" });
      }
      lastStatus.current = status;
    }
  }, [status, showToast]);

  return null;
}