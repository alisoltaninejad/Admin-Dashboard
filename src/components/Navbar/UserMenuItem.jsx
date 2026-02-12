import Icon from "../Icons/Icons";
export default function UserMenuItem({
  iconName,
  iconSize = "sm",
  ClickHandler,
  txt,
}) {
  return (
    <>
      <button
        className="w-full text-right px-3 py-2 text-sm flex items-center gap-2 hover:bg-brand-300 text-brand-700 rounded-md transition-all duration-200"
        onClick={ClickHandler}>
        <Icon name={iconName} size={iconSize} className="text-brand-600" />
        <span className="flex-1">{txt}</span>
      </button>
    </>
  );
}
