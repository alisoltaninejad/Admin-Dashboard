import { useState, useRef, useEffect } from "react";
import Icon from "./../Icons/Icons";
import ProfileMenu from "./ProfileMenu";
import SearchBox from "./SearchBox";
import ControlButtons from "./ControlButtons";
export default function UserMenu() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

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
    <div className="w-[79.8%] h-[69px]  fixed end-0  border-b border-b-gray-200 bg-white">
      <div className="flex justify-between items-center">
        {/* بخش سمت راست */}
        <SearchBox />

        {/* بخش سمت چپ */}
        <div className="flex gap-3 p-3">
          <ControlButtons name='theme' icoName="moon" />
          <ControlButtons name='notification' icoName="ring" badge='1'/>
          {/* منوی کاربر */}
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

            {showProfileMenu && (
              <ProfileMenu handleMenuItemClick={handleMenuItemClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
