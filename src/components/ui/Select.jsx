import { useEffect, useRef, useState } from "react";
import Icon from "./../Icons/Icons";

function Select({
  label,
  selectName,
  required,
  options = [],
  value: controlledValue,
  onChange,
  placeholder = "انتخاب کنید",
  disabled = false,
}) {
  const [value, setValue] = useState(controlledValue ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // sync controlled mode
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newValue) => {
    setValue(newValue);
    onChange?.(newValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="flex justify-between items-center my-3 gap-3">
      <label htmlFor={selectName} className="flex w-fit text-left">
        {label}:{required && <span className="text-red-700 px-1">*</span>}
      </label>

      <div
        ref={selectRef}
        className="relative min-w-56 text-sm"
      >
        {/* Trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            w-full h-8 px-2
            flex items-center justify-between
            rounded-md
            bg-brand-200 dark:bg-brand-300
            border border-brand-700
            shadow-xs shadow-brand-600
            text-body
            transition-all duration-200
            hover:border-brand-500
            focus:outline-none focus:ring-2 focus:ring-brand-500
          "
        >
          <span className={`${!value ? "opacity-50" : ""}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <Icon
            name="chevronDown"
            color="brand"
            className={`
              w-5 h-5 transition-transform duration-300
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* Dropdown */}
        <div
          className={`
            absolute left-0 mt-1 w-full z-50 max-h-46 overflow-auto
            rounded-md
            bg-brand-200 dark:bg-brand-300
            border border-brand-700
            shadow-lg shadow-brand-700/40
            transition-all duration-200
            ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }
          `}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`
                px-3 py-2 cursor-pointer
                text-body
                transition-colors duration-150
                hover:bg-brand-400/40
                ${
                  value === opt.value
                    ? "bg-brand-400/30 font-medium"
                    : ""
                }
              `}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Select;
