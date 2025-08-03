import React from "react";
import Icon from "../Icons/Icons";

export default function LatestUsers() {
  const usersInfo = [
    { id: 1, name: "Ali Soltani", job: "Dev", pic: "" },
    { id: 2, name: "reza", job: "doc", pic: "" },
    { id: 3, name: "naji", job: "lawyer", pic: "" },
    { id: 4, name: "chom", job: "dent", pic: "" },
    { id: 5, name: "babay", job: "farmer", pic: "" },
  ];
  return (
    <div className="w-2/6 shadow p-4 rounded-lg">
      <h2 className="text-xl mb-3">کاربران تازه ورود</h2>
      {usersInfo.map((item) => {
        return (
          <div key={item.id} className="flex w-5/6 mx-auto justify-between items-center space-y-1">
            {/* profile pic */}
            <div>
              {item.pic ? (
                <img src={item.pic} alt="profile pic" />
              ) : (
                <Icon name="profile" />
              )}
            </div>
            {/* title */}
            <div className="flex flex-col text-center">
              <h3>{item.name}</h3>
              <h6 className="text-gray-400 text-sm">{item.job}</h6>
            </div>
            {/* view btn */}
            <button className="cursor-pointer bg-gray-200 rounded-md p-2">
              <Icon name="eye" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
