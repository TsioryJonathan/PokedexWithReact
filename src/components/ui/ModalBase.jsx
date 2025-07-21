import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * @param {boolean} open 
 * @param {function} onClose 
 * @param {React.ReactNode} children 
 * @param {string} [title] 
 * @param {string} [className] 
 * @param {React.ReactNode} [header]
 */

export default function ModalBase({ open, onClose, children, title, className = "", header }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-xl flex items-start pt-2 justify-center"
      onClick={onClose}
    >
      <motion.div
        className={`w-[90vw] min-h-[60vh] max-h-[95vh] rounded-2xl border border-white/15 shadow-2xl bg-gradient-to-br from-slate-800/70 via-slate-900/80 to-slate-950/90 flex flex-col overflow-y-auto p-10 relative ${className}`}
        onClick={e => e.stopPropagation()}
        initial={{ y: 48, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 32, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <button
          className="absolute top-2 right-4 z-50 text-white bg-transparent rounded-lg cursor-pointer hover:bg-gray-700 p-2 w-fit h-fit"
          onClick={onClose}
        >
          <X size={28} />
        </button>
        {header || (title && <h2 className="text-2xl font-bold mb-6 text-white text-center">{title}</h2>)}
        {children}
      </motion.div>
    </div>
  );
}
