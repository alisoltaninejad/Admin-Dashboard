import Features from "./features";
import Chart from "./chart";
import LatestUsers from "../../components/LatestUsers/LatestUsers";
import LatestTransactions from "../../components/LatestTransactions/LatestTransactions";
export default function Home() {
  return (
    <div className="mt-10 md:mt-0">
      <div className="flex justify-between items-center my-5 gap-4 md:gap-6 text-center mx-auto">
        <Features lable="درآمد" price={12_445} percentage={-1.2} />
        <Features lable="فروش" price={3_122} percentage={-8.7} />
        <Features lable="هزینه ها" price={1_132_854} percentage={4.3} />
      </div>

      <Chart />

     <div className="flex flex-col lg:flex-row  gap-4 mt-6">
       <LatestUsers />
      <LatestTransactions />
     </div>
    </div>
  );
}
