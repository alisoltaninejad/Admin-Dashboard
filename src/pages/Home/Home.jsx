import React from "react";
import Features from "./features";
import Chart from "./chart";
export default function Home() {
  return (
    <div className=" p-4">
      <div className="flex justify-between items-center mb-5 gap-6 text-center mx-auto">
        <Features lable='درآمد' price={12_445}  percentage={-1.2}/>
        <Features lable='فروش' price={3_122}  percentage={-8.7}/>
        <Features lable='هزینه ها' price={1_132_854}  percentage={4.3}/>
      </div>

      <Chart/>
    </div>
  );
}
