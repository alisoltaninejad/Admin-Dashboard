export default function NewUserInputs({name, text, type = 'text'}) {
  return (
    <div className='flex items-center my-3 gap-4'>
      <label htmlFor={name} className='w-24 text-left'>{text}:</label>
      <input 
        type={type} 
        name={name} 
        className='flex-1 grow h-10  rounded-md shadow shadow-gray-700'
      />
    </div>
  );
}