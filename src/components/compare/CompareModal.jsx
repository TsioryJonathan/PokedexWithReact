import { X } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Compare from "./Compare";

function CompareModal({ setIsOpen }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-xl flex items-start pt-2 justify-center "
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        className="w-[90vw] min-h-[95vh] rounded-2xl border border-white/15 shadow-2xl bg-gradient-to-br from-slate-800/70 via-slate-900/80 to-slate-950/90 flex flex-col overflow-y-auto p-10 "
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 48, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 32, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <button
          className="absolute top-2 right-4 z-99 text-white bg-transparent rounded-lg cursor-pointer hover:bg-gray-700 p-2 w-fit h-fit"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>
        <div>
          <Compare className="w-full"/>
        </div>
      </motion.div>
    </div>
  );
}

export default CompareModal;
