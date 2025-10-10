import React from "react";
import Icon from "./../Icons/Icons";

export default function SidebarHeader({ setShowSidebar }) {
  return (
<div className="relative flex w-full h-[80px] p-4 items-center text-gray-800 xl:bg-brand-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
  
  {/* دکمه بستن */}
  <button
    className="xl:hidden cursor-pointer p-1 hover:bg-red-100 rounded transition-colors align-bottom"
    onClick={() => setShowSidebar(false)}
  >
    <Icon name="close" size="lg" color="danger" />
  </button>

  {/* لوگو در وسط */}
  <div className="flex items-end gap-2 mx-auto">
    <span className="text-2xl font-Aleo">AliSoliNejad</span>
    <Icon name="king" size="lg" className="w-[50px] h-[50px]" />
  </div>

</div>
  );
}
