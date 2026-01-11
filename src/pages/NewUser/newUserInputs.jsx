export default function NewUserInputs({ name, text, type = "text" }) {
  return (
    <div className="flex items-center w-70 md:w-60 my-3 gap-3">
      <label htmlFor={name} className="w-6 text-left">
        {text}:
      </label>
      <input
        type={type}
        name={name}
        className="flex-1 grow h-8 rounded-md shadow shadow-gray-700"
      />
    </div>
  );
}
