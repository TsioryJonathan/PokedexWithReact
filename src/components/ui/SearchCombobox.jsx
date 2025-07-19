import React, { useState, useRef } from 'react';
import { SearchIcon } from 'lucide-react';

/**
 * SearchCombobox
 * @param {string} value - current input value
 * @param {function} onChange - called with new value on input change
 * @param {array} options - array of { value, label } to show in dropdown
 * @param {function} onSelect - called with value when an option is selected
 * @param {string} placeholder - input placeholder
 * @param {string} className - additional classes for the wrapper
 * @param {boolean} disabled - disables the input
 */
export default function SearchCombobox({
  value,
  onChange,
  options = [],
  onSelect,
  placeholder = '',
  className = '',
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClick(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type='text'
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        className='w-full p-3 pl-10 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white transition-colors'
        role='combobox'
        aria-autocomplete='list'
        aria-expanded={isOpen}
        autoComplete='off'
      />
      <SearchIcon size={18} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none' />
      {isOpen && options.length > 0 && (
        <ul className='absolute z-10 w-full mt-1 rounded-md shadow-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 max-h-48 overflow-y-auto select-none' role='listbox'>
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              className='p-2 hover:bg-indigo-500 hover:text-white cursor-pointer capitalize transition-colors'
              role='option'
              aria-selected={value === opt.value}
              tabIndex={0}
              onMouseDown={() => { onSelect(opt.value); setIsOpen(false); }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelect(opt.value); setIsOpen(false);
                }
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
