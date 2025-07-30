import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        <ChevronLeft className="w-6 h-6 text-slate-300 hover:text-white" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
            currentPage === i + 1
              ? "bg-indigo-600 text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-700"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        <ChevronRight className="w-6 h-6 text-slate-300 hover:text-white" />
      </button>
    </div>
  );
}

export default Pagination;