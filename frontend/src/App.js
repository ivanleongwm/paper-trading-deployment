import './App.css';
import HeaderBar from './views/Header/HeaderBar';
import FooterBar from './views/FooterBar/FooterBar';
import Portfolio from './views/Portfolio/Portfolio';
import RegisterForm from './views/Forms/RegisterForm/RegisterForm'
import LoginForm from './views/Forms/LoginForm/LoginForm'
import LoginSuccessful from './views/Forms/LoginSuccess/LoginSuccess';
import FormDataDisplay from './views/Forms/FormDataDisplay/FormDataDisplay';
import PieChartColorsUpdate from './views/PieChart/PieChartColorUpdate';
import UserProfile from './views/User Profile/userProfile';
import Buy from './views/Buy/Buy'
import Sell from './views/Sell/Sell'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useState, createContext, useReducer, useEffect} from 'react';
import urlcat from "urlcat";
import {BACKEND} from './utils/utils';
import fetchData from './views/fetchDispatch';
import axios from 'axios';

export const DataContext = createContext(null)

function App() {
  const [secret, setSecret] = useState({
    user: "",
    purchaseLog:[]
  });
  const [cashBalance, setCashBalance] = useState(0)

  const dataStoreReducer = (state,action) => {
    switch (action.type) {
      case "RETRIEVE-USER-DATA":
        return ({...state,...action.value})
      case "RETRIEVE-PIECHART-COLORS":
        return ({...state,colours: action.value})
      case "SET-TICKERS":
        return ({...state,tickers:action.value})
      case "RETRIEVE-HISTORICAL-STOCK-PRICES":
        return ({...state, historicalStockPrices: action.value})
      case "UPDATE-STOCKBALANCE":
        return ({...state, stockBalance: action.value})
      case "UPDATE-CASHBALANCE":
        return ({...state, cashBalance: action.value})
      case "UPDATE-NASDAQ":
        return ({...state, nasdaq: action.value})
      case "UPDATE-STOCKPRICES":
        return ({...state, stock: action.value})
      default:
        return state
    }
  }

  const [dataStore,dispatch] = useReducer(dataStoreReducer, {
    username: sessionStorage.getItem("username"),
    cashBalance: 0,
    colours: ['#ADD8E6','#9cacf1','#8dd1e1','#82ca9d','#a4de6c','#d0ed57'],
    purchaseLog:[],
    salesLog:[],
    stockBalance : [],
    historicalStockPrices : [],
    tickers:{},
    nasdaq:[],
    stock:[]
});

  useEffect(() => {
    // checks for login success and retrieves data for user
    const url = urlcat(BACKEND, `/api/users/loginsuccessful/${sessionStorage.getItem("username")}`);
    fetchData(url, "GET",undefined,undefined,dispatch,"RETRIEVE-USER-DATA")
  },[])

  useEffect(()=>{
    //fetches colors used by portfolio pie chart based on username
    const url2 = urlcat(BACKEND, `/api/piechart/colours/${sessionStorage.getItem("username")}`);
    fetchData(url2, "GET",undefined,undefined,dispatch,"RETRIEVE-PIECHART-COLORS")
  },[])

  useEffect(()=> {
    // retrieve the tickers held by user
    const internalSetTickers = {}
    for (const stock of dataStore.stockBalance) {
        internalSetTickers[stock.ticker] = stock.quantity
    }
    dispatch({type:"SET-TICKERS",value:internalSetTickers})
  },[dataStore.stockBalance])

  useEffect(()=> {
    // retrieve historical stock prices for tickers held by the user
    const stockPromises = []
    const stockResults = []

    const stockTickerCalls = async () => {
      for (const ticker of Object.keys(dataStore.tickers)) {
          stockPromises.push(
              axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=ed422f5ab8a52bef7a04a8d39de5129d`)
              )
        }

        const stockResponses = await Promise.allSettled(stockPromises)

        stockResponses.forEach((resp,index) => {
          stockResults.push(resp.value.data)
        })
        dispatch({type:"RETRIEVE-HISTORICAL-STOCK-PRICES",value:stockResults})
      }
    stockTickerCalls()
  },[dataStore.tickers])


  useEffect(()=> {
    // retrieve list of nasdaq stocks
    axios.get('https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=ed422f5ab8a52bef7a04a8d39de5129d')
    .then(res => {
      const nasdaqRawObject = res.data;
      const listOfNasdaqCompanies = []
      nasdaqRawObject.map((x,i) => {
        listOfNasdaqCompanies.push(nasdaqRawObject[i].symbol)
      })
      dispatch({type:"UPDATE-NASDAQ",value:listOfNasdaqCompanies})
    })
  },[])

  useEffect(() => {

    const mainCompanyStockCall = async () => {
        const stockPromises = []
        const stockResults = []
        const cleanedStockResults = []
        
        for (let i = 0; i < dataStore.nasdaq.length/5; i++) {
            stockPromises.push(
                axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${dataStore.nasdaq.slice(1*i*5,5+i*5).join(",")}?from=2022-07-12&to=2022-07-22&apikey=ed422f5ab8a52bef7a04a8d39de5129d`)
            )
          }

        const stockResponses = await Promise.allSettled(stockPromises)

        stockResponses.forEach((resp,index) => {
            stockResults.push(resp.value.data)
          })
        
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
        dispatch({type:"UPDATE-STOCKPRICES",value:cleanedStockResults})
    }
    mainCompanyStockCall()
  },[dataStore.nasdaq])

  useEffect(()=>{
    console.log("Global Data Store",dataStore)
  },[dataStore.stock])


  return (
    <BrowserRouter>
      <div className="App">
        <DataContext.Provider value={dataStore}>
          <header className="App-header">
            <HeaderBar cashBalance={cashBalance} setCashBalance={setCashBalance}/>
            <Routes>
              <Route path="/" element={<Portfolio />}/>
              <Route path="/buy" element={<Buy dispatch={dispatch}/>}/>
              <Route path="/sell" element={<Sell dispatch={dispatch}/>}/>
              <Route path="/loginsuccessful" element={<LoginSuccessful secret={secret} setSecret={setSecret} cashBalance={cashBalance} setCashBalance={setCashBalance}/>}/>
              <Route path="/register" element={<RegisterForm cashBalance={cashBalance} setCashBalance={setCashBalance} />}/>
              <Route path="/login" element={<LoginForm cashBalance={cashBalance} setCashBalance={setCashBalance} />}/>
              <Route path="/display" element={<FormDataDisplay/>}/>
              <Route path="/piechart" element={<PieChartColorsUpdate/>}/>
              <Route path="/userprofile" element={<UserProfile  cashBalance={cashBalance} setCashBalance={setCashBalance} />}/>
            </Routes>
            <FooterBar />
          </header>
        </DataContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;