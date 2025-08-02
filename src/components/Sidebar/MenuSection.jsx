import React from "react";

export default function MenuSection({ title, children }) {
  return (
    <div className="mt-8">
      <h3 className="px-4 text-xs font-semibold text-brand-600 uppercase tracking-wider">{title}</h3>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );
}