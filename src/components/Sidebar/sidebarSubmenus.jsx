import React from "react";

export default function sidebarSubmenus({txt,href='#'}) {
  return (
    <a
      href={href}
      className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 rounded transition-colors">
      {txt}
    </a>
  );
}
