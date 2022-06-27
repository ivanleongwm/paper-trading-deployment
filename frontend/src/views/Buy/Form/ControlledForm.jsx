import React, { useState , useEffect } from "react";
import './ControlledForm.css'
import urlcat from "urlcat";
import { BACKEND } from "../../../utils/utils";

function Form(props) {
  const [error, setError] = useState("");
  const [date, setCurrentDate] = useState(props.historicalPrices.historical[0].date);
  const [purchasePrice, setPurchasePrice] = useState(props.historicalPrices.historical[0].close);
  const [quantity, setQuantity] = useState(0);
  const [username, setUsername] = useState(props.username);
  const [ticker,setTicker] = useState(props.historicalPrices.symbol);

  // create a function that makes a post request when the buy button is clicked
  const url = urlcat(BACKEND, `/api/holding/updatedPurchaseLog/${sessionStorage.getItem("username")}`);
  const url2 = urlcat(BACKEND, `/api/users/loginsuccessful/${sessionStorage.getItem("username")}`);
  const url3 = urlcat(BACKEND, `/api/holding/updatedStockBalance/${sessionStorage.getItem("username")}`);

  const buyStock = (stockDetails) => {
    fetch(url, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"purchaseLog":[stockDetails]}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => console.log(error));
  };

  const buyStock2 = (stockBalanceStateValue) => {
    // puts new stockBalance array into Stock Balance
    fetch(url3, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "stockBalance" : stockBalanceStateValue,
        "cashBalance" : props.cashBalance - (Number(quantity) * Number(purchasePrice)),
    }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => console.log(error));
  };

  //put to stockBalance works, however, ticker state changes onchange, resulting in change
  // or original array. Need to save original array somewhere, and push new ticker in
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const updateStockBalance = (ticker,quantity) => {
    let newState = null;
    const oldStock = props.stockBalanceOriginalState.find(x => x.ticker === ticker)
    if (oldStock) {
      const otherStocks = props.stockBalanceOriginalState.filter(x => x.ticker !== ticker)
      const newStock = { ...oldStock, quantity: Number(oldStock.quantity) + Number(quantity)}
      newState = [ ...otherStocks, newStock]
    } else {
      const newStock = { ticker, quantity:Number(quantity)}
      newState = [...props.stockBalanceOriginalState, newStock]
    }
    // let stockBalanceState = [...stockBalanceOriginalState]
    // let toPush = true;
    // let addedStock = true;

    // for (let i=0;i<stockBalanceState.length; i++) {
    //   //let stock of stockBalanceState
    //   console.log('stockticer', stockBalanceState[i].ticker, typeof stockBalanceState[i].ticker)
    //   console.log('tick2', ticker)
    //   console.log('before', stockBalanceState[i])
    //   if (stockBalanceState[i].ticker == ticker && addedStock) {
    //     const newStock = {...stockBalanceState[i]}
    //     newStock.quantity = Number(stockBalanceState[i].quantity) + Number(quantity)
    //     toPush = false;
    //     addedStock = false;
    //   } 
      
    // }

    // if (toPush) {
    //   stockBalanceState.push({
    //     "ticker": ticker,
    //     "quantity": quantity
    //   })
    // }

    // console.log("STOCKBALANCEAFTER",stockBalanceState)
    // setSecret({stockBalance: stockBalanceState})
    buyStock2(newState)
    props.setStockBalanceOriginalState(newState)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted!")
    const stockDetails = { date, ticker, quantity, purchasePrice };
    console.log("Session storage in buy",sessionStorage.getItem("cashBalance"),"quantity",Number(quantity),"Purchase price",Number(purchasePrice))
    //sessionStorage.setItem("cashBalance",sessionStorage.getItem("cashBalance") - (Number(quantity) * Number(purchasePrice)));
    props.setCashBalance(props.cashBalance - (Number(quantity) * Number(purchasePrice)))
    buyStock(stockDetails);
    console.log('ticker',ticker)
    updateStockBalance(ticker,quantity)
  };

  // with the current date, today's price and quantity, username

  // might need to store current state of logged in user on the superparent level


  //sets the 'default' fields in the form
  const [formData, setFormData] = useState({
    Quantity: 0,
    price: 0,
  });

  //makes input controlled - updates whenever something is typed
  const handleChange = (event) => {
    const name = event.target.name; //refers to input name
    setFormData({ ...formData, [name]: event.target.value, price: event.target.value }); //name is in sq brackets is to refer to variable in this scope (this.name)
    console.log(formData);
    setQuantity(event.target.value)
  };

  console.log(props.historicalPrices)
  //in onSubmit; passing props to parent through handleSubmit
  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit}
      >
        <label>
          Buy Quantity : |  
          <input className="input-quantity"
            name="Quantity"
            placeholder="qty"
            onChange={handleChange}
            type="number"
          />
          |
        </label>
        <div>Total Price: {(formData.price * props.historicalPrices.historical[0].close).toLocaleString('en', {useGrouping:true})}</div>
      {
          (formData.price * props.historicalPrices.historical[0].close) < props.cashBalance ?
          <input className="buy-button" type="submit" value="Buy" /> :
          <div className="funds-exceeded">Insufficient Funds (Max:{(props.cashBalance).toLocaleString('en', {useGrouping:true})})</div>
      }
        <p>{error}</p>
      </form>
    </div>
  );
}
export default Form;
