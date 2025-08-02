import React from "react";

export default function SubmenuItem({ txt, active }) {
  return (
    <a
      href="#"
      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
        active ? "bg-brand-100 text-brand-800" : "text-gray-600 hover:bg-brand-50"
      }`}
    >
      {txt}
    </a>
  );
}