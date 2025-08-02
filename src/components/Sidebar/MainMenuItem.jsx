import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../Icons/Icons";

export default function MainMenuItem({ item, isOpen, onClick }) {
  const location = useLocation();
  const hasSubmenu = item.submenus?.length > 0;
  const isActive = location.pathname === item.path || 
    item.submenus?.some(sub => sub.path === location.pathname);

  return (
    <div className="group">
      {hasSubmenu ? (
        <button
          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
            isActive ? "bg-brand-100 text-brand-800" : "text-gray-700 hover:bg-brand-50"
          }`}
          onClick={() => onClick(item.id)}
        >
          <div className="flex items-center">
            <Icon name={item.icon} className="w-5 h-5 me-2" />
            <span>{item.title}</span>
          </div>
          <Icon
            name="chevronDown"
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      ) : (
        <Link
          to={item.path}
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive ? "bg-brand-100 text-brand-800" : "text-gray-700 hover:bg-brand-50"
          }`}
        >
          <Icon name={item.icon} className="w-5 h-5 me-2" />
          <span>{item.title}</span>
        </Link>
      )}

      {hasSubmenu && isOpen && (
        <div className="mt-1 pl-8 space-y-1">
          {item.submenus.map((submenu) => (
            <SubmenuItem key={submenu.id} item={submenu} />
          ))}
        </div>
      )}
    </div>
  );
}

const SubmenuItem = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <Link
      to={item.path}
      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
        isActive ? "bg-brand-100 text-brand-800" : "text-gray-600 hover:bg-brand-50"
      }`}
    >
      {item.title}
    </Link>
  );
};