import React from 'react'
import Icon from "./../Icons/Icons";

export default function SidebarHeader() {
  return (
    <div className="flex w-full h-[80px] p-4 text-2xl items-baseline justify-center text-gray-800 bg-brand-300 shadow shadow-brand-950 z-50">
        <span className="self-end  font-Aleo">AliSoliNejad</span>
        <Icon name="king" size="lg" className="w-[50px] h-[50px]" />
      </div>
  )
}
