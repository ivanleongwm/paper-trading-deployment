import TopSpacer from "../Header/TopSpacer";
import PieChart from "./PieChart";
import Tabs from './Tabs/Tabs'
import './Portfolio.css'
import { useState, useEffect, useContext } from "react";
import moment from 'moment'
import { DataContext } from '../../App';

export default function Portfolio() {
    const dataContext = useContext(DataContext);
    const [pieChartData,setPieChartData] = useState([])
    const [aggregatedByStocksPastSevenDays,setAggregatedByStocksPastSevenDays] = useState([])
    const [mainLineGraphData,setMainLineGraphData] = useState([])
    const [coloursState,setColoursState] = useState(['#ADD8E6','#9cacf1','#8dd1e1','#82ca9d','#a4de6c','#d0ed57'])
    
    // Third UseEffect call
    useEffect(()=> {
      // set colors state used by pie charts
      try {
        setColoursState([dataContext.colours.colour1,dataContext.colours.colour2,dataContext.colours.colour3,dataContext.colours.colour4,dataContext.colours.colour5,dataContext.colours.colour6])
      }
      catch(err) {
        console.log(err)
      }
      
    },[dataContext.nasdaq])

    const retrievePieChartDetails = () => {
        console.log("retrieve pie chart details function called")
        console.log("data context", dataContext)
        const stocksHeld = dataContext.tickers
        const historicalPrices = dataContext.historicalStockPrices
        const pieChartData = []
        
        for (let i = 0; i < historicalPrices.length; i++) {
          let historicalPriceClose = historicalPrices[i].historical[0].close
          pieChartData.push({
              name: historicalPrices[i].symbol,
              value: (Math.round(historicalPriceClose * stocksHeld[historicalPrices[i].symbol])),
              fill: coloursState[i]
          })    
          console.log(historicalPrices[i].symbol, "Historical price close", historicalPrices[i].historical[0].close)
          console.log(historicalPrices[i].symbol, "stocks held",stocksHeld[historicalPrices[i].symbol] )
        }

        setPieChartData(pieChartData)
        console.log("PIECHARTDATA",pieChartData)
    }
     
    const retrieveMainLineChartDetails = () => {
      const purchaseDates = {}
      for (let purchase of dataContext.purchaseLog) {
          purchaseDates[purchase.ticker] = moment.utc(purchase.date).format('YYYY-MM-DD')
      }
  
      const pastSevenDays = []
      for (let stock of dataContext.historicalStockPrices) {
          pastSevenDays.push({
              symbol : stock.symbol,
              historical : stock.historical.slice(0,7)
          })
      }

      const stocksHeld = dataContext.tickers
      for (let stock of pastSevenDays) {
          for (let dailyData of stock.historical) {
              dailyData.close = dailyData.close * stocksHeld[stock.symbol]
          }
      }
      setAggregatedByStocksPastSevenDays(pastSevenDays) //set data for individual line graphs in tabs

      for (let stock of pastSevenDays) {
        for (let dailyData of stock.historical) {
            dailyData.close = dailyData.close / stocksHeld[stock.symbol]
        }
      }

      const aggregatedStocks = []
      if (pastSevenDays.length > 0) {
          for (let i = 0; i < pastSevenDays[0].historical.length; i++) {
              let totalForDay = 0
              for (let x = 0; x < pastSevenDays.length; x++) {
                  totalForDay += pastSevenDays[x].historical[i].close
              }
              aggregatedStocks.push({
                  date: pastSevenDays[0].historical[i].date,
                  close: totalForDay
              })
          }
      }
      setMainLineGraphData(aggregatedStocks.reverse())     
    }

    useEffect(()=> {
      // calculate pie chart and lineChart data
      retrievePieChartDetails()
      retrieveMainLineChartDetails()
    },[dataContext.historicalStockPrices,dataContext.colours,dataContext])


    return (
        <div>
            <TopSpacer/>
            {(dataContext.stock.length > 0)|(sessionStorage.getItem("username") ==null) ? null : <div class="loader" id="loader"></div>}
            {
                (sessionStorage.getItem("username") ==null) ? null :
                <div className="chart-container">
                    <PieChart pieChartData={pieChartData}/>
                    <Tabs mainLineGraphData={mainLineGraphData} individualLineGraphData={aggregatedByStocksPastSevenDays}/>
                </div>
            }
        </div>
    )
}