import { useState } from "react";
import Icon from "./../Icons/Icons";
import Sidebar from "./../Sidebar/Sidebar";

export default function SearchBox() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex gap-3 p-3 ">
      {/* hanling mobile menu from here */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="xl:hidden flex justify-center items-center w-fit p-2 shadow rounded-sm focus:bg-brand-50 cursor-pointer">
        <Icon name="menu" />
      </button>
      <div className="hidden md:flex items-center w-[400px] p-2 shadow rounded-sm">
        <input
          type="text"
          className="w-full outline-none bg-transparent "
          placeholder="جستجو..."
        />
        <Icon name="search" />
      </div>

      {showSidebar && (
        <>
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div
          onClick={()=>{setShowSidebar(false)}}
           className="absolute inset-0 w-screen h-screen bg-black/25 backdrop-blur-[1px] z-10"></div>
        </>
      )}

    </div>
  );
}
