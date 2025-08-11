import React from "react";
import Input from "./newUserInputs";
import Icon from "../../components/Icons/Icons";
export default function Newuser() {
  return (
    <>
      <div className="w-[65%] h-[350px] flex justify-evenly items-center gap-6 mx-auto ">
        {/* {inputs section } */}
        <div className=" flex flex-col justify-center items-center p-6">
          <Input name="name" text="نام" />
          <Input name="email" text="ایمیل" />
          <Input name="phone" text="تلفن" />
          <Input name="job" text="شغل" />
        </div>
        {/* {profile pic avatar} */}
        <div className="relative">
          <Icon name="profile" color="brand" className="w-[300px] h-[300px]" />
          <Icon
            name="upload"
            color="danger"
            className="w-[50px] h-[50px] absolute bottom-6 end-10 bg-white rounded-full p-1.5 "
          />
        </div>
      </div>
      <button className="block w-[65%]  h-8 mt-4 mx-auto rounded-md bg-brand-800 text-white cursor-pointer">
        ثبت اطلاعات
      </button>
    </>
  );
}
