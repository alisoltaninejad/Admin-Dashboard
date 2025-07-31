import React from "react";
import Icon from "./../Icons/Icons";

export default function Sidebar() {
  return (
    <div className="w-1/5 fixed top-0 bottom-0 shadow">
      <a href="#" className=" flex w-full h-[80px] p-4 text-2xl items-center justify-center text-gray-800 bg-brand-300  shadow shadow-brand-950">
        <span className="p-2">AliSoliNejad</span>
        <Icon name="king" size='lg' className='w-10 h-10'/>
      </a>
    </div>
  );
}
