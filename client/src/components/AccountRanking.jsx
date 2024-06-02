import React from "react";

const AccountRanking = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => {
        let bgColor;
        if (index + 1 === 1) {
          bgColor = "bg-red-500";
        } else if (index + 1 === 2) {
          bgColor = "bg-orange-500";
        } else if (index + 1 === 3) {
          bgColor = "bg-green-500";
        } else {
          bgColor = "bg-gray-500";
        }

        return (
          <div
            key={index}
            className="container mx-auto p-2 pl-1 bg-white w-[300px] h-[70px]"
          >
            <div className="relative flex items-center ">
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden">
                <img
                  src={item.avatar}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              </div>
              <div className="ml-3 flex-grow text-sm">
                <p>{item.name}</p>
                <p>
                  <span className="text-red-600">{item.point} points</span>{" "}
                  <span>/{item.test} tests</span>
                </p>
              </div>
              <div className={`ml-5 w-6 h-6 text-white flex items-center justify-center rounded-sm absolute right-0 mr-2 ${bgColor}`}>
                <p>{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountRanking;
