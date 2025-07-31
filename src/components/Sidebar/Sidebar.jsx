import React, { useState } from "react";
import Icon from "./../Icons/Icons";

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
    <div className="w-1/5 fixed top-0 bottom-0 shadow bg-white">
      {/* هدر سایدبار */}
      <div className="flex w-full h-[80px] p-4 text-2xl items-baseline justify-center text-gray-800 bg-brand-300 shadow shadow-brand-950 z-50">
        <span className="self-end  font-Aleo">AliSoliNejad</span>
        <Icon name="king" size="lg" className="w-[50px] h-[50px]" />
      </div>

      {/* منوی اصلی */}
      <nav className="p-4 pb-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
            <a
              href="#"
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 rounded transition-colors">
              لیست کاربران
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 rounded transition-colors">
              نقش‌های کاربری
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 rounded transition-colors">
              مجوزهای دسترسی
            </a>
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
            <a
              href="#"
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 rounded transition-colors">
              همه محصولات
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 rounded transition-colors">
              دسته‌بندی‌ها
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 rounded transition-colors">
              موجودی انبار
            </a>
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
              <span className="ml-auto bg-brand-100 text-brand-800 text-xs px-2 py-0.5 rounded-full">
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
      </nav>
    </div>
  );
}
