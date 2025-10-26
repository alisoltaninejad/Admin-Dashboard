import React from "react";
import Icon from "../Icons/Icons";
export default function UserMenuItem({iconName,iconSize='sm',ClickHandler,txt}) {
  return (
    <>
      <button
        className="w-full text-right px-3 py-2 text-sm flex items-end gap-2 hover:bg-gray-50 rounded-md"
        onClick={ClickHandler}>
        <Icon name={iconName} size={iconSize} />
       {txt}
      </button>
      
    </>
  );
}
