import React from "react";
import AccountRanking from "./AccountRanking";
import jsonData from "./data.json";

const Ranking = () => {
  return (
    <div className="container flex-col mx-auto  bg-gray-100 rounded-xl bg-clip-border w-full h-[480px] mr-1 mt-0 shadow-md">
      <h4 className="pt-3 pb-4  px-auto text-center font-bold  ">RANKING</h4>
    
      <hr className="w-full border-0 border-b-2 bg-white" />
      <div className="overflow-y-auto overflow-x-hidden h-5/6">
        <AccountRanking items={jsonData} />
      </div>
    </div>
  );
};

export default Ranking;