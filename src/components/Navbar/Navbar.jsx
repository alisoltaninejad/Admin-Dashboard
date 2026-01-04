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
      <div className="w-full h-[69px] xl:w-[79.8%] fixed end-0 z-50 border-b border-b-gray-200 bg-brand-100  md:bg-white">
        <div className="flex justify-between items-center relative">
          
          <SearchBox />

          <div className="md:hidden flex pb-2">
            <span className="self-end  font-Aleo">AliSoliNejad</span>
            <Icon name="king" size="lg" className="w-[50px] h-[50px]" />
          </div>

          {/* Desktop Version Section */}
          <div className="hidden md:inline-block">
            <div className="flex gap-3 p-3">
              <ControlButtons name="theme" icoName="moon" />
              <ControlButtons name="notification" icoName="ring" badge="1" />
              
              <div className="relative" ref={menuRef}>
                <button
                  className="flex justify-between items-center gap-2 w-fit text-sm p-2 cursor-pointer hover:bg-brand-50 rounded-lg transition-all"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}>
                  <Icon name="userAvatar" />
                  <h4 className="flex items-center gap-1">
                    حساب کاربری
                    <Icon
                      name="chevronDown"
                      size="sm"
                      className={`transition-transform ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </h4>
                </button>
              </div>

              {showProfileMenu && (
                <div className="absolute top-full left-2 right-2 mt-1">
                  <ProfileMenu handleMenuItemClick={handleMenuItemClick} />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Version Toggle */}
          <button
            onClick={() => setShowLeftSection(!showLeftSection)}
            className="md:hidden flex justify-center items-center w-fit m-3 p-2 shadow rounded-sm focus:bg-brand-50 cursor-pointer">
            <Icon name="ellipsis" />
          </button>

          {/* Mobile Dropdown Section */}
          {showLeftSection && (
            <div className="md:hidden absolute top-full w-full h-fit py-1 px-2 bg-white border-t border-gray-200 shadow-md ">
              <div className="flex justify-between items-center gap-2 px-2 py-1">
                
                <div className="flex items-center w-[50%] p-1 shadow rounded-sm">
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent "
                    placeholder="جستجو..."
                  />
                  <Icon name="search" />
                </div>

                <div className="w-[40%] flex justify-end gap-2 items-center ">
                  <div className="flex gap-2">
                    <ControlButtons
                      name="theme"
                      icoName="moon"
                      iconSize="sm"
                      className="p-1 min-w-6 min-h-6"
                    />
                    <ControlButtons
                      name="notification"
                      icoName="ring"
                      badge="1"
                      iconSize="sm"
                      className="p-1 min-w-6 min-h-6"
                    />
                  </div>
                  
                  <div className="relative" ref={menuRef}>
                    <button
                      className="flex justify-between items-center gap-1 w-fit text-xs p-1 cursor-pointer hover:bg-brand-50 rounded transition-all"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}>
                      <Icon name="userAvatar" size="sm" />
                      <h4 className="flex items-center gap-0.5 text-[10px]">
                        <Icon
                          name="chevronDown"
                          size="xs"
                          className={`transition-transform ${
                            showProfileMenu ? "rotate-180" : ""
                          }`}
                        />
                      </h4>
                    </button>
                  </div>
                  
                  {showProfileMenu && (
                    <div className="absolute top-full left-2 right-2 mt-1">
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