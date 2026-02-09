import { useEffect, useState } from "react";

function Select({
  label,
  selectName,
  required,
  options = [],
  value: controlledValue,
  onChange,
  placeholder = "انتخاب کنید",
  disabled = false,
  error = "",
}) {
  const [value, setValue] = useState(controlledValue ?? "");

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex justify-center items-center mx-auto my-3 gap-3">
      <label htmlFor={selectName} className="flex w-fit text-left">
        {label}:{required && <span className="text-red-700 px-1">*</span>}
      </label>

      <select
        name={selectName}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`flex items-center justify-around min-w-56 text-sm h-8 rounded-md shadow-sm shadow-brand-500 px-2  bg-brand-200 dark:bg-brand-300 focus:outline-none focus:border-none cursor-pointer`}>
        <option value="" disabled
         className="flex items-center justify-around min-w-56 text-sm  px-4 bg-brand-200 dark:bg-brand-300  ">
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}
          className="flex items-center justify-around min-w-56 text-sm  px-4 bg-brand-200 dark:bg-brand-300 text-brand-800">
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default Select;
