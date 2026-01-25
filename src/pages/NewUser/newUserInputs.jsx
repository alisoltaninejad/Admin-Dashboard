export default function Input({ 
  name, 
  text, 
  type = "text", 
  autoFocus = false,
  onKeyDown,
  inputRef, // prop جدید برای ref
  ...props 
}) {
  return (
    <div className="flex items-center w-70 md:w-60 my-3 gap-6">
      <label htmlFor={name} className="w-6 text-left">
        {text}:
      </label>
      <input
        ref={inputRef} // استفاده از inputRef
        type={type}
        name={name}
        id={name}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        className="flex-1 grow h-8 rounded-md shadow shadow-brand-500 ps-2 bg-brand-200 dark:bg-brand-300"
        {...props}
      />
    </div>
  );
}