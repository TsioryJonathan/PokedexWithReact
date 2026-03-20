import React from "react";

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  textarea = false,
}) {
  return (
    <div className="flex flex-col mb-3">
      {label && (
        <label htmlFor={name} className="mb-1 font-medium text-gray-100">
          {label}
        </label>
      )}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`border rounded p-2 resize-none ${className}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`border rounded p-2 ${className}`}
          required
        />
      )}
    </div>
  );
}
