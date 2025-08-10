import React from "react";
import Input from "./newUserInputs";
import Icon from "../../components/Icons/Icons";
export default function Newuser() {
  return (
    <>
      <div className="w-full h-[350px] flex justify-center items-center ">
        <div className='relative'>
          <Icon name="profile" color="brand" className="w-[300px] h-[300px]" />
          <Icon name="upload" color="danger" 
          className='w-[50px] h-[50px] absolute bottom-6 end-10 bg-white rounded-full p-1.5 ' />
          
        </div>

        <div className=" flex flex-col justify-center items-center">
          <Input name="name" text="نام" />
          <Input name="email" text="ایمیل" />
          <Input name="phone" text="تلفن" />
          <Input name="job" text="شغل" />
        </div>
      </div>
      <button className="block w-[800px]  h-8 mt-4 mx-auto rounded-md bg-brand-800 text-white cursor-pointer">ثبت اطلاعات</button>
    </>
  );
}
