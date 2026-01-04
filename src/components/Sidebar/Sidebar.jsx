import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../Icons/Icons";
import SidebarHeader from "./SidebarHeader";
import MainMenuItem from "./MainMenuItem";
import {
  mainMenuItems,
  contentManagementItems,
  settingsItems,
} from "./menuData";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  // مدیریت وضعیت باز یا بسته بودن چندین منو به صورت همزمان با استفاده از یک شیء (Object)
  // کلید هر آیتم ID منو و مقدار آن boolean (باز/بسته) است
  const [openMenus, setOpenMenus] = useState({});

  const location = useLocation();

  // تابعی برای تغییر وضعیت منو؛ وضعیت قبلی را حفظ کرده و فقط منوی کلیک شده را Toggle می‌کند
  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  return (
    <div
      className={`${
        showSidebar ? "flex" : "hidden"
      } xl:flex flex-col min-w-[300px] xl:min-w-[200px] lg:w-1/5 h-screen fixed top-0 start-0 bg-white shadow-lg z-50`}>
      <SidebarHeader setShowSidebar={setShowSidebar} />
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
        {mainMenuItems.map((item) => (
          <MainMenuItem
            key={item.id}
            item={item}
            isOpen={openMenus[item.id]}
            onClick={toggleMenu}
            setShowSidebar={setShowSidebar}
          />
        ))}

        <div className="mt-6">
          <h3 className="px-4 text-xs font-semibold text-brand-600 uppercase tracking-wider">
            مدیریت محتوا
          </h3>
          <div className="mt-2 space-y-1">
            {contentManagementItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 1280)
                    setShowSidebar(false);
                }}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-brand-100 text-brand-800"
                    : "text-gray-700 hover:bg-brand-50"
                }`}>
                <Icon name={item.icon} className="w-5 h-5 me-2" />
                <span>{item.title}</span>
                {item.badge && (
                  <span className="mr-auto bg-brand-50 text-brand-800 text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="px-4 text-xs font-semibold text-brand-600 uppercase tracking-wider">
            تنظیمات
          </h3>
          <div className="mt-2 space-y-1">
            {settingsItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 1280)
                    setShowSidebar(false);
                }}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-brand-100 text-brand-800"
                    : "text-gray-700 hover:bg-brand-50"
                }`}>
                <Icon name={item.icon} className="w-5 h-5 me-2" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-100">
        ساخته شده با ❤️ توسط علی سلطانی
      </div>
    </div>
  );
}