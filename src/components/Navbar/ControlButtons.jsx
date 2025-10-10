import React from 'react'
import Icon from "./../Icons/Icons";

export default function ControlButtons({name,icoName,badge,iconSize}) {
  const clickHandler =()=>{
    if(name==='theme'){

    }
  }
    return (
       <button
       onClick={clickHandler}
       className=" relative w-fit p-2 shadow rounded-full cursor-pointer hover:bg-brand-50 transition-all">
            <Icon name={icoName} size={iconSize}/>
           {badge && ( <span className='absolute -top-1 -start-1.5 p-0.5 px-1.5 text-[10px] bg-brand-100 text-brand-500 rounded-full'> {badge}</span>)}
          </button>
  )
}
