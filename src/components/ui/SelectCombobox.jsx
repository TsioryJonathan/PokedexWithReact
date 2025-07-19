import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search as SearchIcon } from "lucide-react";

/**
 * SelectCombobox
 * - Affiche une dropdown comme un <select> natif mais permet la saisie
 * - Filtrage : commence par (case insensitive)
 * - Navigation clavier : flèches, entrée, escape
 */
export default function SelectCombobox({
  value,
  onChange,
  options = [], // [{ value, label }]
  onSelect,
  placeholder = "",
  className = "",
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Filtrage: commence par (case insensitive)
  const filtered = options.filter(opt =>
    value ? opt.label.toLowerCase().startsWith(value.toLowerCase()) : true
  );

  // Ouvre la dropdown si input focus ou clic sur la flèche
  function openDropdown() {
    setIsOpen(true);
    setHighlighted(-1);
  }
  function closeDropdown() {
    setIsOpen(false);
    setHighlighted(-1);
  }

  // Navigation clavier
  function handleKeyDown(e) {
    if (!isOpen && ["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
      openDropdown();
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlighted(h => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && highlighted >= 0) {
      onSelect(filtered[highlighted].value);
      closeDropdown();
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  }

  // Click outside pour fermer
  useEffect(() => {
    function handleClick(e) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        listRef.current &&
        !listRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Scroll to highlighted
  useEffect(() => {
    if (isOpen && highlighted >= 0 && listRef.current) {
      const item = listRef.current.children[highlighted];
      if (item) item.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted, isOpen]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={openDropdown}
          onClick={openDropdown}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full p-3 pl-10 pr-8 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white transition-colors cursor-pointer"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          autoComplete="off"
        />
        <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 focus:outline-none"
          onMouseDown={e => { e.preventDefault(); isOpen ? closeDropdown() : openDropdown(); }}
        >
          <ChevronDown size={18} />
        </button>
      </div>
      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 rounded-md shadow-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 max-h-48 overflow-y-auto select-none"
          role="listbox"
        >
          {filtered.map((opt, idx) => (
            <li
              key={opt.value}
              className={`p-2 cursor-pointer capitalize transition-colors ${highlighted === idx ? "bg-indigo-500 text-white" : "hover:bg-indigo-100 dark:hover:bg-indigo-700"}`}
              role="option"
              aria-selected={value === opt.value}
              tabIndex={0}
              onMouseDown={() => { onSelect(opt.value); closeDropdown(); }}
              onMouseEnter={() => setHighlighted(idx)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
