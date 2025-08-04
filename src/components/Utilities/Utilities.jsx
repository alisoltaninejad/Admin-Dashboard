import React from "react";
import { toGregorian } from "jalaali-js";

// تبدیل ارقام فارسی به انگلیسی
const toEnglishDigits = (str) =>
  str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// تبدیل ارقام انگلیسی به فارسی
const toPersianDigits = (num) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return num.toString().replace(/\d/g, (d) => persianDigits[d]);
};

// فرمت کردن مبلغ به صورت زیبا با جداکننده هزارگان
const formatAmount = (amount) => {
  return toPersianDigits(new Intl.NumberFormat("fa-IR").format(amount));
};

// تبدیل تاریخ شمسی (فارسی) به تاریخ میلادی قابل مقایسه
const parsePersianDate = (persianDate) => {
  const englishDate = toEnglishDigits(persianDate);
  const [year, month, day] = englishDate.split("/").map(Number);
  const g = toGregorian(year, month, day);
  return new Date(g.gy, g.gm - 1, g.gd);
};



export default {toEnglishDigits,toPersianDigits,parsePersianDate,formatAmount}