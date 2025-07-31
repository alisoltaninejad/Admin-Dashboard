import { useState, useRef, useEffect } from "react";
import Icon from "./../Icons/Icons";
import UserMenuItem from './UserMenu'
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
    <div className="w-4/5 h-[69px]  fixed end-0  border-b border-b-gray-200">
      <div className="flex justify-between items-center">
        {/* بخش سمت راست */}
        <div className="flex gap-3 p-3">
          <button className="flex justify-center items-center w-fit p-2 shadow rounded-sm">
            <Icon name="menu" />
          </button>
          <div className="flex items-center w-[400px] p-2 shadow rounded-sm">
            <input
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder="جستجو..."
            />
            <Icon name="search" />
          </div>
        </div>

        {/* بخش سمت چپ */}
        <div className="flex gap-3 p-3">
          <button className="w-fit p-2 shadow rounded-full cursor-pointer hover:bg-brand-50 transition-all">
            <Icon name="moon" />
          </button>
          <button className="w-fit p-2 shadow rounded-full cursor-pointer hover:bg-brand-50 transition-all">
            <Icon name="ring" />
          </button>
          
          {/* منوی کاربر */}
          <div className="relative" ref={menuRef}>
            <button
              className="flex justify-between items-center gap-2 w-fit text-sm p-2 cursor-pointer hover:bg-brand-50 rounded-lg transition-all"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <Icon name="userAvatar" />
              <h4 className="flex items-center gap-1">
                حساب کاربری
                <Icon 
                  name="chevronDown" 
                  size="sm" 
                  className={`transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
                />
              </h4>
            </button>

            {showProfileMenu && (
              <div className="absolute top-full end-0 w-48 mt-1 p-2 bg-white shadow-lg rounded-xl z-50 border border-gray-100">
                <div className="px-3 py-2 text-left ">
                  <h4 className="font-medium">username</h4>
                  <h6 className="text-xs text-gray-500 truncate">email@gmail.com</h6>
                </div>
                  <div className="w-4/5 mx-auto border-t border-gray-200 my-1" />

                <div className="py-1">
                  <UserMenuItem 
                  iconName='profile'
                  ClickHandler={handleMenuItemClick}
                  txt='ویرایش پروفایل'
                  />
                  <UserMenuItem 
                  iconName='setting'
                  ClickHandler={handleMenuItemClick}
                  txt=' تنظیمات حساب'
                  />
                  <UserMenuItem 
                  iconName='warn'
                  ClickHandler={handleMenuItemClick}
                  txt='پشتیبانی'
                  />
             
                  <div className="w-4/5 mx-auto border-t border-gray-200 my-1" />

                  <button 
                    className="w-full text-right px-3 py-2 text-sm flex items-end gap-2 hover:bg-red-50 text-red-500 rounded-md"
                    onClick={handleMenuItemClick}
                  >
                    <Icon name="signOut" size="sm" />
                    خروج
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}