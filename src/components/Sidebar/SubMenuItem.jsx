import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SubmenuItem({ item, setShowSidebar }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <Link
      to={item.path}
      onClick={() => {
        if (window.innerWidth < 1280) setShowSidebar(false);
      }}
      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
        isActive ? "bg-brand-100 text-brand-800" : "text-gray-600 hover:bg-brand-50"
      }`}
    >
      {item.title}
    </Link>
  );
}
