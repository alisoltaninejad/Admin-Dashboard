// src/components/IconSystem/IconSystem.js
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { PiBellRinging } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GoSignOut } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { PiWarningCircle } from "react-icons/pi";
import { GiChessKing } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { LuUpload } from "react-icons/lu";
import { FaEllipsis } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

/**
 * سیستم آیکون‌های متمرکز پروژه
 * @param {string} name - نام آیکون (menu, search, moon)
 * @param {string} size - اندازه (sm, md, lg)
 * @param {string} color - رنگ آیکون
 * @param {string} className - کلاس‌های اضافی
 */
const IconSystem = ({ name, size = "md", color = "primary", className = "" }) => {
  const icons = {
    menu: HiMiniBars3BottomRight,
    search: FiSearch,
    moon: IoMoonOutline,
    ring: PiBellRinging,
    userAvatar: FaRegUser,
    profile: CgProfile,
    chevronDown: IoIosArrowDown,
    signOut:GoSignOut,
    setting:IoSettingsOutline,
    warn:PiWarningCircle,
    king:GiChessKing,
    dashboard:RxDashboard,
    shoppingCart:FiShoppingCart,
    pages:HiOutlineDocumentDuplicate,
    document:IoDocumentTextOutline,
    arrowUp:FaArrowUp,
    arrowDown:FaArrowDown,
    eye:FaEye,
    edit:TiEdit,
    upload:LuUpload,
    ellipsis:FaEllipsis,
    close:IoClose,
    
  };

  const sizeClasses = {
    xs: "w-2 h-2 text-xs",
    sm: "w-4 h-4 text-sm",
    md: "w-5 h-5 text-base",
    lg: "w-6 h-6 text-lg",
    xl: "w-8 h-8 text-xl",
    xxl: "w-10 h-10 text-2xl  ",
  };

  const colorClasses = {
    primary: "text-brand-500",
    secondary: "text-gray-500 dark:text-gray-400",
    accent: "text-blue-600 dark:text-blue-400",
    danger: "text-red-500 dark:text-red-400",
    success: "text-green-500 dark:text-green-400",
    dark: "dark:text-black text-white",
    brand: "text-brand-500 ",
  };

  const IconComponent = icons[name];

  if (!IconComponent) {
    console.error(`آیکون "${name}" یافت نشد!`);
    return null;
  }

  return (
    <IconComponent
      className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      aria-hidden="true"
    />
  );
};

export default IconSystem;