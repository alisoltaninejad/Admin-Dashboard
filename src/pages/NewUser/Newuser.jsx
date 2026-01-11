import React from "react";
import Input from "./newUserInputs";
import Icon from "../../components/Icons/Icons";
export default function Newuser() {
  return (
    <>
      <div className="min-w-fit min-h-fit w-[65%] h-full flex flex-col md:flex-row justify-center items-center md:gap-6 mx-auto md:mt-12 ">
        {/* {profile pic avatar} */}
        <div className="relative md:order-2 mx-auto">
          
          <Icon name="profile" color="brand" className="w-[200px] h-[200px]  md:w-[300px] md:h-[300px]" />
          <Icon
            name="upload"
            color="danger"
            className="md:w-[50px] md:h-[50px] w-[40px] h-[40px]  absolute bottom-6 end-6 bg-white rounded-full p-2 "
          />
        </div>
        {/* {inputs section } */}
        <div className=" flex md:order-1 flex-col justify-center items-center p-6">
          <Input name="name" text="نام" />
          <Input name="email" text="ایمیل" />
          <Input name="phone" text="تلفن" />
          <Input name="job" text="شغل" />
        </div>
      </div>
      <button className="block w-80 h-8  md:w-[65%] md:h-10 md:mt-4 mx-auto rounded-md bg-brand-800 text-white cursor-pointer">
        ثبت اطلاعات
      </button>
    </>
  );
}
