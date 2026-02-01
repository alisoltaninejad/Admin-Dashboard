import { useRef } from "react";
import Icon from "../../components/Icons/Icons";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";

export default function Newuser() {
  const inputRefs = useRef([]);
  
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false,
  );
  
  return (
    <>
      <div className="min-w-fit min-h-fit w-[65%] flex flex-col md:flex-row justify-center items-center md:gap-6 mx-auto mt-5 md:mt-16 ">
        {/* {profile pic avatar} */}
        <div className="relative md:order-2 mx-auto">
          <Icon
            name="profile"
            color="brand"
            className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
          />
          <Icon
            name="upload"
            color="danger"
            className="md:w-[50px] md:h-[50px] w-[40px] h-[40px] absolute bottom-6 end-6 bg-white  rounded-full p-2 shadow"
          />
        </div>
        
        {/* {inputs section } */}
        <div className="flex md:order-1 flex-col justify-center items-center p-6">
          <Input
            element="input"
            name="name" 
            id="username"
            lable="نام"
            placeholder="علی سلطانی نژاد"
            autoFocus={true}
            required={true}
            validations={[
              requiredValidator(),
              minValidator(3),
              maxValidator(30),
            ]}
            onInputHandler={onInputHandler}></Input>
          <Input 
            element="input"
            name="email" 
            id="email"
            lable="ایمیل"
            required={true}
            placeholder="alosolinejad@gmail.com"
            validations={[
              requiredValidator(),
              minValidator(4),
              maxValidator(30),
              emailValidator(),
            ]}
            onInputHandler={onInputHandler}></Input>
          <Input 
            element="input"
            name="phone" 
            id="phone"
            lable="تلفن"
            required={true}
            placeholder="09135006973"
            validations={[
              requiredValidator(),
              minValidator(11),
              maxValidator(11),
            ]}
            onInputHandler={onInputHandler}></Input>
          <Input 
            element="input"
            name="job" 
            id="job"
            lable="شغل"
            placeholder="انتخاب از لیست"
            validations={[
              requiredValidator(),
              minValidator(11),
              maxValidator(11),
            ]}
            onInputHandler={onInputHandler}></Input>
        </div>
      </div>
      <Button
        type="submit"
        disabled={true}
        className="block w-80 h-8 md:w-[65%] md:h-10 md:mt-4 mx-auto rounded-md bg-brand-600 hover:bg-brand-700 dark:hover:bg-brand-400 transition-all duration-200 text-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-brand-600 disabled:dark:hover:bg-brand-600 disabled:transform-none disabled:shadow-none">
        ثبت اطلاعات
      </Button>
    </>
  );
}
