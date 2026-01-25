import Icon from "./../Icons/Icons";
import { useTheme } from "./../../Context/Theme/ThemeContext";

export default function ControlButtons({ name, icoName, badge, iconSize }) {
  const { toggleTheme } = useTheme();

  const clickHandler = () => {
    if (name === "theme") toggleTheme();
  };

  return (
    <button
      onClick={clickHandler}
      className="relative w-fit p-2 rounded-full shadow dark:bg-brand-200
                 hover:bg-brand-100 transition-all"
    >
      <Icon name={icoName} size={iconSize} />

      {badge && (
        <span className="absolute -top-1 -start-1.5 text-[10px] 
                         bg-brand-300 dark:bg-brand-400 text-brand-700 px-1.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}
