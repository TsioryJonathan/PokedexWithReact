import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

const ToastContext = createContext();

const TOAST_TYPES = {
  success: {
    icon: <CheckCircle className="text-green-600 text-xl" />,
    color: "bg-green-100 text-green-900 border-green-400",
  },
  error: {
    icon: <XCircle className="text-red-600 text-xl" />,
    color: "bg-red-100 text-red-900 border-red-400",
  },
  warning: {
    icon: <AlertTriangle className="text-yellow-600 text-xl" />,
    color: "bg-yellow-100 text-yellow-900 border-yellow-400",
  },
  info: {
    icon: <Info className="text-blue-600 text-xl" />,
    color: "bg-blue-100 text-blue-900 border-blue-400",
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({
    message,
    type = "info",
    duration = 3000,
    id = Date.now() + Math.random(),
  }) => {
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const contextValue = { showToast };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toasts container */}
      <div className="fixed top-5 right-5 z-[3000] flex flex-col gap-3 items-end">
        {toasts.map(({ id, message, type }) => {
          const { icon, color } = TOAST_TYPES[type] || TOAST_TYPES.info;
          return (
            <div
              key={id}
              className={`flex items-center gap-2 px-4 py-2 rounded shadow border-l-4 font-medium animate-toast-in ${color}`}
              style={{ minWidth: 220 }}
              role="status"
              aria-live="polite"
            >
              {icon}
              <span>{message}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toast-in { from { opacity: 0; transform: translateY(-20px) scale(0.96); } to { opacity: 1; transform: none; } }
        .animate-toast-in { animation: toast-in 0.25s cubic-bezier(0.4,0,0.2,1); }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
