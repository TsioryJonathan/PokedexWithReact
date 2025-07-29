import { useState, useEffect } from "react";

/**
 * useNetworkQuality - React hook to detect network status (offline/online/weak/strong)
 * Returns one of: "offline", "weak", "online", "strong"
 */
export default function useNetworkQuality() {
  const [status, setStatus] = useState(() => {
    if (!navigator.onLine) return "offline";
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return "online";
    if (conn.downlink < 1 || conn.effectiveType === "2g" || conn.saveData) return "weak";
    return "strong";
  });

  useEffect(() => {
    const updateStatus = () => {
      if (!navigator.onLine) return setStatus("offline");
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (!conn) return setStatus("online");
      if (conn.downlink < 1 || conn.effectiveType === "2g" || conn.saveData) setStatus("weak");
      else setStatus("strong");
    };
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) conn.addEventListener("change", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
      if (conn) conn.removeEventListener("change", updateStatus);
    };
  }, []);

  return status;
}
