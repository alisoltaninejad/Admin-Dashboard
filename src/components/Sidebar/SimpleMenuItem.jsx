import React from "react";
import Icon from "../Icons/Icons";

export default function SimpleMenuItem({ item }) {
  return (
    <a href={item.path} className="flex items-center px-4 py-2 text-gray-700 hover:bg-brand-50 rounded-lg transition-colors">
      <Icon name={item.icon} className="w-5 h-5 me-1" />
      <span>{item.title}</span>
      {item.badge && (
        <span className="ml-auto bg-brand-100 text-brand-800 text-xs mx-1 px-1 py-0.5 rounded-full">{item.badge}</span>
      )}
    </a>
  );
}