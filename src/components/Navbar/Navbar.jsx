import { useState, useRef, useEffect } from "react";
import Icon from "./../Icons/Icons";
import ProfileMenu from "./ProfileMenu";
import SearchBox from "./SearchBox";
import ControlButtons from "./ControlButtons";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLeftSection, setShowLeftSection] = useState(false);
  const menuRef = useRef(null);

  // مدیریت بستن منوها با کلیک خارج از محدوده (Click Outside)
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = () => {
    setShowProfileMenu(false);
  };

  return (
    <>
      <div className="w-full h-[69px] xl:w-[79.8%] fixed end-0 z-50 border-b border-b-gray-200 bg-brand-200 md:bg-white dark:bg-black">
        <div className="flex justify-between items-center relative">
          <SearchBox />

          <div className="md:hidden flex pb-2 items-center gap-1">
            <span className="self-end font-Aleo text-brand-800 dark:text-brand-500 tracking-wide">
              AliSoliNejad
            </span>
            <Icon
              name="king"
              size="lg"
              className="w-[50px] h-[50px] text-brand-600 dark:text-brand-400 drop-shadow-sm"
            />
          </div>

          {/* Desktop Version Section */}
          <div className="hidden md:inline-block">
            <div className="flex gap-3 p-3 items-center">
              {/* این دکمه‌ها باید در ساختار داخلی خود از text-brand-700 استفاده کنند */}
              <ControlButtons name="theme" icoName="moon" />
              <ControlButtons name="notification" icoName="ring" badge="1" />

              <div className="relative" ref={menuRef}>
                <button
                  className="flex justify-between items-center gap-2 w-fit text-sm p-2 cursor-pointer hover:bg-brand-200 text-brand-800 rounded-lg transition-all"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}>
                  <Icon name="userAvatar" className="text-brand-600" />
                  <h4 className="flex items-center gap-1 font-medium">
                    حساب کاربری
                    <Icon
                      name="chevronDown"
                      size="sm"
                      className={`transition-transform text-brand-500 ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </h4>
                </button>

                {showProfileMenu && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-[60]">
                    <ProfileMenu handleMenuItemClick={handleMenuItemClick} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Version Toggle */}
          <button
            onClick={() => setShowLeftSection(!showLeftSection)}
            className="md:hidden flex justify-center items-center w-fit m-3 p-2 shadow-sm border border-brand-300 bg-brand-100 text-brand-700 rounded-sm ">
            <Icon name="ellipsis" className="text-brand-600" />
          </button>

          {/* Mobile Dropdown Section */}
          {showLeftSection && (
            <div className="md:hidden absolute top-full w-full h-fit py-1 px-2 bg-brand-100 border-t border-brand-300 shadow-md z-30">
              <div className="flex justify-between items-center gap-2 px-2 py-1">
                {/* موبایل - باکس جستجو */}
                <div className="flex items-center w-[50%] p-2 shadow-sm border border-brand-200 dark:bg-brand-200 rounded-sm focus-within:border-brand-500 transition-all">
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent text-brand-800 text-xs placeholder:text-brand-400"
                    placeholder="جستجو..."
                  />
                  <Icon name="search" size="sm" className="text-brand-500" />
                </div>

                <div className="w-[40%] flex justify-end gap-2 items-center">
                  <div className="flex gap-2">
                    <ControlButtons name="theme" icoName="moon" iconSize="sm" />
                    <ControlButtons
                      name="notification"
                      icoName="ring"
                      badge="1"
                      iconSize="sm"
                    />
                  </div>

                  <div className="relative" ref={menuRef}>
                    <button
                      className="flex justify-between items-center gap-1 w-fit text-xs p-1 cursor-pointer hover:bg-brand-200 text-brand-800 rounded transition-all"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}>
                      <Icon
                        name="userAvatar"
                        size="sm"
                        className="text-brand-600"
                      />
                      <h4 className="flex items-center gap-0.5 text-[10px]">
                        <Icon
                          name="chevronDown"
                          size="xs"
                          className={`transition-transform text-brand-500 ${
                            showProfileMenu ? "rotate-180" : ""
                          }`}
                        />
                      </h4>
                    </button>
                  </div>

                  {showProfileMenu && (
                    <div className="absolute top-full left-2 right-2 mt-1 z-[60]">
                      <ProfileMenu handleMenuItemClick={handleMenuItemClick} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
