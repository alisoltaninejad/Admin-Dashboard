import { useRef } from "react";
import Input from "./newUserInputs";
import Icon from "../../components/Icons/Icons";

export default function Newuser() {
  const inputRefs = useRef([]);
  
  // هندلر کلید Enter
  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };
  
  return (
    <>
      <div className="min-w-fit min-h-fit w-[65%] flex flex-col md:flex-row justify-center items-center md:gap-6 mx-auto mt-5 md:mt-16 ">
        {/* {profile pic avatar} */}
        <div className="relative md:order-2 mx-auto">
          <Icon name="profile" color="brand" className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]" />
          <Icon
            name="upload"
            color="danger"
            className="md:w-[50px] md:h-[50px] w-[40px] h-[40px] absolute bottom-6 end-6 bg-white  rounded-full p-2 shadow"
          />
        </div>
        
        {/* {inputs section } */}
        <div className="flex md:order-1 flex-col justify-center items-center p-6">
          <Input 
            name="name" 
            text="نام" 
            autoFocus={true}
            inputRef={(el) => inputRefs.current[0] = el}
            onKeyDown={(e) => handleKeyDown(0, e)}
          />
          <Input 
            name="email" 
            text="ایمیل"
            inputRef={(el) => inputRefs.current[1] = el}
            onKeyDown={(e) => handleKeyDown(1, e)}
          />
          <Input 
            name="phone" 
            text="تلفن"
            inputRef={(el) => inputRefs.current[2] = el}
            onKeyDown={(e) => handleKeyDown(2, e)}
          />
          <Input 
            name="job" 
            text="شغل"
            inputRef={(el) => inputRefs.current[3] = el}
            onKeyDown={(e) => handleKeyDown(3, e)}
          />
        </div>
      </div>
      <button 
        type="button"
        className="block w-80 h-8 md:w-[65%] md:h-10 md:mt-4 mx-auto rounded-md bg-brand-600 hover:bg-brand-700 dark:hover:bg-brand-400 transition-colors text-white cursor-pointer"
      >
        ثبت اطلاعات
      </button>
    </>
  );
}