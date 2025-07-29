import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

function SearchInput({ searchTerm, setSearchTerm }) {
  const [value, setValue] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(value);
    }, 500);
    return () => clearTimeout(handler);
  }, [value, setSearchTerm]);

  return (
    <div className="relative w-full max-w-md group">
      <Search
        size={20}
        className="
          absolute left-4 top-1/2 transform -translate-y-1/2
          text-gray-400 dark:text-gray-500
          group-focus-within:text-blue-500
          transition-colors duration-200
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for a pokemon..."
        className="
          w-full pl-12 pr-20 py-3
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-600
          text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
          rounded-xl
          shadow-sm dark:shadow-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 ease-in-out
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="
            absolute right-4 top-1/2 transform -translate-y-1/2
            text-gray-400 dark:text-gray-500
            hover:text-gray-600 dark:hover:text-gray-300
            transition-colors duration-200
          "
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
