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
    <div className="flex items-center w-70 md:w-60 my-3 gap-3">
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
        className="flex-1 grow h-8 rounded-md shadow shadow-gray-700 ps-2"
        {...props}
      />
    </div>
  );
}