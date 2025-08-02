import React from 'react'
import Icon from "./../Icons/Icons";

export default function SearchBox() {
  return (
     <div className="flex gap-3 p-3">
          <button className="flex justify-center items-center w-fit p-2 shadow rounded-sm">
            <Icon name="menu" />
          </button>
          <div className="flex items-center w-[400px] p-2 shadow rounded-sm">
            <input
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder="جستجو..."
            />
            <Icon name="search" />
          </div>
        </div>
  )
}
