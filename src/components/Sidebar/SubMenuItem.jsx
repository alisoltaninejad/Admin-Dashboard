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
      className={`block px-3 py-2 text-sm rounded-md transition-colors hover:text-brand-700 ${
        isActive
          ? "bg-brand-300 text-brand-700"
          : "text-brand-800 hover:bg-brand-300"
      }`}>
      {item.title}
    </Link>
  );
}
