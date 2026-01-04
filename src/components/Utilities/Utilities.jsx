import React from "react";
import { toGregorian } from "jalaali-js";

// برای انجام محاسبات ریاضی یا ذخیره‌سازی در دیتابیس، ابتدا باید اعداد فارسی را به انگلیسی تبدیل کنیم
const toEnglishDigits = (str) =>
  str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// برای نمایش نهایی به کاربر ایرانی، تمام اعداد تولید شده توسط سیستم را به فارسی برمی‌گردانیم
const toPersianDigits = (num) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return num.toString().replace(/\d/g, (d) => persianDigits[d]);
};

// تبدیل عدد خام به فرمت پولی (جداکننده ۳ رقم) و فارسی‌سازی اعداد برای خروجی زیبا در جدول‌ها
const formatAmount = (amount) => {
  return toPersianDigits(new Intl.NumberFormat("fa-IR").format(amount));
};

// چون مقایسه دو تاریخ شمسی به صورت رشته (String) دقیق نیست، 
// آن‌ها را به میلادی تبدیل می‌کنیم تا بتوانیم بر اساس زمان (Timestamp) مرتب‌سازی کنیم.
const parsePersianDate = (persianDate) => {
  const englishDate = toEnglishDigits(persianDate);
  const [year, month, day] = englishDate.split("/").map(Number);
  
  // استفاده از کتابخانه jalaali-js برای تبدیل دقیق سال/ماه/روز به معادل میلادی
  const g = toGregorian(year, month, day);
  
  // خروجی یک شیء استاندارد Date است که در متد sort دیتابیس یا کامپوننت‌ها استفاده می‌شود
  return new Date(g.gy, g.gm - 1, g.gd);
};

export default { toEnglishDigits, toPersianDigits, parsePersianDate, formatAmount };