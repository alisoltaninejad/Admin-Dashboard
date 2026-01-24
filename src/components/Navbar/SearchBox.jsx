import { useState } from "react";
import Icon from "./../Icons/Icons";
import Sidebar from "./../Sidebar/Sidebar";

export default function SearchBox() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
   <div className="flex gap-3 p-3">
  {/* handling mobile menu from here */}
  <button
    onClick={() => setShowSidebar(!showSidebar)}
    className="xl:hidden flex justify-center items-center w-fit p-2 shadow-sm border border-brand-300 bg-brand-100 text-brand-700 rounded-sm "
  >
    <Icon name="menu" />
  </button>

  {/* Search Box */}
  <div className="hidden md:flex items-center w-[400px] p-2 shadow-sm border border-brand-200 dark:bg-brand-200 rounded-sm focus-within:border-brand-500 transition-all">
    <input
      type="text"
      className="w-full outline-none bg-transparent text-brand-800 placeholder:text-brand-500/70 text-sm"
      placeholder="جستجو..."
    />
    <Icon name="search" className="text-brand-500" />
  </div>

  {showSidebar && (
    <>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {/* Backdrop */}
      <div
        onClick={() => setShowSidebar(false)}
        className="fixed inset-0 w-screen h-screen bg-black/30 backdrop-blur-[2px] z-40"
      ></div>
    </>
  )}
</div>
  );
}
