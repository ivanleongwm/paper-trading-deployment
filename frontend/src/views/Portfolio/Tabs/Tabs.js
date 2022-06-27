import React, { useState } from "react";
import TabNavItem from "./AllTabs/TabNavItem";
import TabContent from "./AllTabs/TabContent";
import './Tabs.css'
//import tabs content
import FirstTabLineChart from './AllTabs/Content/LineChart'
import IndividualLineChart from './AllTabs/Content/IndividualLineChart'
 
export default function Tabs({mainLineGraphData,individualLineGraphData}) {
  const [activeTab, setActiveTab] = useState("tab1");
 
  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="Total Portfolio Value" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
        {
          individualLineGraphData.map((stock,index) => {
            return (
              <TabNavItem title={stock.symbol} id={stock.symbol} activeTab={activeTab} setActiveTab={setActiveTab}/>
            )
          })
        }
      </ul>
 
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <FirstTabLineChart mainLineGraphData={mainLineGraphData}/>
        </TabContent>
        {individualLineGraphData.map((stock,index) => {
          return (
            <TabContent id={stock.symbol} activeTab={activeTab} >
              <IndividualLineChart stockdata={stock}/>
            </TabContent>
          )
        })}
      </div>
    </div>
  );
};