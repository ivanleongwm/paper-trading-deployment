import TopSpacer from "../Header/TopSpacer";
import stockHistoricalPrices from "../../model/stockHistoricalPrices"
import userAccountData from "../../model/userAccountData";
import SellStockCard from "./SellStockCard/SellStockCard";
import './Sell.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import urlcat from "urlcat";
import { BACKEND } from "../../utils/utils";

export default function Sell({cashBalance, setCashBalance}) {
    const [stock, setStock] = useState([])
    const [nasdaq,setNasdaq] = useState("")
    const [secret, setSecret] = useState({
        user: "",
        purchaseLog:[],
        stockBalance:[]
      });
    const [stockBalanceOriginalState,setStockBalanceOriginalState] = useState([])

    const url = urlcat(BACKEND, `/api/users/loginsuccessful/${sessionStorage.getItem("username")}`);

    const loginSuccessCheck = () => {
        fetch(url, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
              console.log(response)
            return response.json()
          })
          .then((data) => {
            console.log("first data",data)
            setSecret({ ...secret, user: data.username, purchaseLog: data.purchaseLog, stockBalance: data.stockBalance })
            setStockBalanceOriginalState(data.stockBalance)
            })
          .catch((error) => console.log(error));
      };
    
      useEffect(() => {
        loginSuccessCheck()
      },[])
    
      useEffect(()=> {
        axios.get('https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=ed422f5ab8a52bef7a04a8d39de5129d')
        .then(res => {
          const nasdaqRawObject = res.data;
          const listOfNasdaqCompanies = []
          console.log(res.data)
          nasdaqRawObject.map((x,i) => {
            listOfNasdaqCompanies.push(nasdaqRawObject[i].symbol)
          })
          console.log("list of nasdaq companies",listOfNasdaqCompanies.join(","))
          setNasdaq(listOfNasdaqCompanies)
          console.log(nasdaq)
        })
      },[])

      useEffect(() => {

        const mainCompanyStockCall = async () => {
            const stockPromises = []
            const stockResults = []
            const cleanedStockResults = []
            
            for (let i = 0; i < 10; i++) {
                stockPromises.push(
                    axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${nasdaq.slice(1*i*5,5+i*5).join(",")}?apikey=ed422f5ab8a52bef7a04a8d39de5129d`)
                )
              }

            const stockResponses = await Promise.allSettled(stockPromises)
            console.log('stockresponses',stockResponses)

            stockResponses.forEach((resp,index) => {
                stockResults.push(resp.value.data)
              })
            console.log("resolved api calls",stockResults)
            
            for (const stockbatch of stockResults) {
                for (const stock of stockbatch.historicalStockList) {
                    cleanedStockResults.push(stock)
                }
            }

            function compare( a, b ) {
                if ( a.symbol < b.symbol ){
                  return -1;
                }
                if ( a.symbol > b.symbol ){
                  return 1;
                }
                return 0;
              }
              
            cleanedStockResults.sort( compare );
            console.log("cleaned sorted stock list",cleanedStockResults)
            setStock(cleanedStockResults)
        }
        mainCompanyStockCall()
      },[nasdaq])

    console.log("secret state from other component",secret)

    return (
        <div>
            <TopSpacer />
            <div className="buy-container">
                {
                    stock.map((x, i) => {
                        return (<SellStockCard stockHistoricalPrices={stock[i]} userAccountData={userAccountData} secret={secret} username={secret.user} stockBalanceOriginalState={stockBalanceOriginalState} setStockBalanceOriginalState={setStockBalanceOriginalState} cashBalance={cashBalance} setCashBalance={setCashBalance}/>);
                      })
                }
            </div>
        </div>
    )
}
