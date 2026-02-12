import { useRef } from "react";
import Icon from "../../components/Icons/Icons";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Jobs from "./jobsList";
import { useForm } from "../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  phoneValidator,
  emailValidator,
} from "../../Validators/rules";

export default function Newuser() {
  const inputRefs = useRef([]);

  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      job: {
        value: "",
        isValid: false,
      },
    },
    false,
  );
  console.log(formState);

  return (
    <>
      <div className="min-w-fit min-h-fit bg-brand-100 w-[65%] h-screen md:h-[calc(100vh-220px)] flex flex-col md:flex-row justify-start items-center md:items-start md:gap-6 mx-auto mt-5 md:mt-16 ">
        {/* {profile pic avatar} */}
        <div className="relative md:order-2 mx-auto">
          <Icon
            name="profile"
            color="brand"
            className="w-[200px] h-[200px] md:w-[330px] md:h-[330px]"
          />
          <Icon
            name="upload"
            color="danger"
            className="md:w-[50px] md:h-[50px] w-[40px] h-[40px] absolute bottom-6 end-6 bg-white  rounded-full p-2 shadow"
          />
        </div>

       <div>
           {/* {inputs section } */}
        <div className=" flex md:order-1 flex-col justify-baseline items-baseline mx-auto p-6">
             <Input
            element="input"
            name="name"
            id="username"
            label="نام"
            placeholder="علی سلطانی نژاد"
            autoFocus
            required
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
            label="ایمیل"
            required
            placeholder="alisolinejad@gmail.com"
            validations={[requiredValidator(), emailValidator()]}
            onInputHandler={onInputHandler}></Input>
          <Input
            element="input"
            name="phone"
            id="phone"
            label="تلفن همراه"
            required
            placeholder="09135006973"
            validations={[phoneValidator()]}
            onInputHandler={onInputHandler}></Input>
          <Select
            name="job"
            id="job"
            label="شغل"
            required
            placeholder="انتخاب از لیست"
            onChange={onInputHandler}
            options={Jobs}></Select>
        </div>
        <Button
        type="submit"
        disabled={!formState.isFormValid}
        className={`block min-w-96  h-8 w-[65%] md:h-10 md:mt-1 mx-auto rounded-md bg-brand-600 hover:bg-brand-700 dark:hover:bg-brand-400 transition-all duration-200 text-white cursor-pointer 
           ${
            formState.isFormValid
            ? ""
            : "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-brand-600 disabled:dark:hover:bg-brand-600 disabled:transform-none disabled:shadow-none"
           } `}>
        ثبت اطلاعات
      </Button>
       </div>
      </div>
      
    </>
  );
}
