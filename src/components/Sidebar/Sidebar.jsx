import React, { useState } from "react";
import Icon from "./../Icons/Icons";
import SubmenuItem from "./sidebarSubmenus";
import MenuItem from "./sidebarMenu";
import SidebarHeader from "./SidebarHeader";
export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({
    users: false,
    products: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  return (
    <div className="flex flex-col  w-1/5 h-screen fixed top-0 bottom-0 shadow bg-white">
      {/* هدر سایدبار */}
      <SidebarHeader />

      {/* منوی اصلی */}
      <nav className="flex flex-col grow p-4 space-y-2 overflow-y-auto  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {" "}
        {/* آیتم اصلی - دشبورد */}
        <a
          href="#"
          className="activeMenuItem flex items-center px-4 py-3  rounded-lg hover:bg-brand-200 transition-colors">
          <Icon name="dashboard" className="w-5 h-5 me-1" />
          <span>پیشخوان</span>
        </a>
        {/* آیتم قابل گسترش - مدیریت کاربران */}
        <div className="group">
          <button
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-brand-50 rounded-lg transition-colors"
            onClick={() => toggleMenu("users")}>
            <div className="flex items-center">
              <Icon name="profile" className="w-5 h-5 me-1" />
              <span>مدیریت کاربران</span>
            </div>
            <Icon
              name="chevronDown"
              className={`w-4 h-4 transition delay-100 ${
                openMenus.users ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* زیرمنوها */}
          <div
            className={`mt-1 pl-8 space-y-1 delay-100 ${
              openMenus.users ? "block" : "hidden"
            }`}>
            <SubmenuItem txt=" لیست کاربران" />
            <SubmenuItem txt="افزودن کاربر جدید" />
            <SubmenuItem txt="مجوزهای دسترسی" />
          </div>
        </div>
        {/* آیتم قابل گسترش - مدیریت محصولات */}
        <div className="group">
          <button
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-brand-50 rounded-lg transition-colors"
            onClick={() => toggleMenu("products")}>
            <div className="flex items-center">
              <Icon name="shoppingCart" className="w-5 h-5 me-1" />
              <span>مدیریت محصولات</span>
            </div>
            <Icon
              name="chevronDown"
              className={`w-4 h-4 transition delay-100 ${
                openMenus.products ? "rotate-180" : ""
              }`}
            />
          </button>
          {/* {لیست منوس محصولات} */}
          <div
            className={`mt-1 pl-8 space-y-1 delay-100 ${
              openMenus.products ? "block" : "hidden"
            }`}>
            <SubmenuItem txt="همه محصولات" />
            <SubmenuItem txt="دسته‌بندی‌ها" />
            <SubmenuItem txt="موجودی انبار" />
          </div>
        </div>
        {/* بخش مدیریت محتوا */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-brand-600 uppercase tracking-wider">
            مدیریت محتوا
          </h3>

          <div className="mt-2 space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-brand-50 rounded-lg transition-colors">
              <Icon name="pages" className="w-5 h-5 me-1" />
              <span>صفحات</span>
            </a>

            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-brand-50 rounded-lg transition-colors">
              <Icon name="document" className="w-5 h-5 me-1" />
              <span>وبلاگ</span>
              <span className="ml-auto bg-brand-100 text-brand-800 text-xs mx-1 px-1 py-0.5 rounded-full">
                جدید
              </span>
            </a>
          </div>
        </div>
        {/* بخش تنظیمات */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-brand-600 uppercase tracking-wider">
            تنظیمات
          </h3>

          <div className="mt-2 space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-brand-50 rounded-lg transition-colors">
              <Icon name="setting" className="w-5 h-5 me-1" />
              <span>تنظیمات سیستم</span>
            </a>
          </div>
        </div>
        <div className="align-bottom mt-auto pt-4 text-center text-xs text-gray-400">
            Made by Ali Soltani
        </div>
      </nav>
    </div>
  );
}
