import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../Icons/Icons";
import SubmenuItem from "./SubMenuItem"

export default function MainMenuItem({
  item,
  isOpen,
  onClick,
  setShowSidebar,
}) {
  const submenus = item.submenus || [];
  const location = useLocation();
  const hasSubmenu = submenus?.length > 0;

  // بررسی فعال بودن منو: اگر مسیر فعلی با مسیر منو یا یکی از زیرمنوهایش برابر باشد، منو هایلایت می‌شود
  const isActive = 
    location.pathname === item.path || 
    (submenus && 
      submenus.some((sub) => sub.path === location.pathname));

  return (
    <div className="group">
      {hasSubmenu ? (
        <button
          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
            isActive
              ? "bg-brand-100 text-brand-800"
              : "text-gray-700 hover:bg-brand-50"
          }`}
          onClick={() => onClick(item.id)}>
          <div className="flex items-center">
            <Icon name={item.icon} className="w-5 h-5 me-2" />
            <span>{item.title}</span>
          </div>
          <Icon
            name="chevronDown"
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <Link
          to={item.path}
          onClick={() => {
            // در دستگاه‌های موبایل و تبلت، پس از کلیک روی لینک و انتقال صفحه، سایدبار را خودکار می‌بندیم
            if (typeof window !== "undefined" && window.innerWidth < 1280)
              setShowSidebar(false);
          }}
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive
              ? "bg-brand-100 text-brand-800"
              : "text-gray-700 hover:bg-brand-50"
          }`}>
          <Icon name={item.icon} className="w-5 h-5 me-2" />
          <span>{item.title}</span>
        </Link>
      )}

      {hasSubmenu && isOpen && (
        <div className="mt-1 pl-8 space-y-1">
          {submenus.map((submenu) => (
            <SubmenuItem
              key={submenu.id}
              item={submenu}
              setShowSidebar={setShowSidebar}
            />
          ))}
        </div>
      )}
    </div>
  );
}