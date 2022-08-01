import React, { useState } from "react";
import './ControlledForm.css'
import urlcat from "urlcat";
import { BACKEND } from "../../../utils/utils";
import {DataContext} from '../../../App'
import {useContext} from 'react'
import fetchData from '../../fetch'

function Form(props) {
  const dataContext = useContext(DataContext);
  const [date, setCurrentDate] = useState(props.historicalPrices.historical[0].date);
  const [purchasePrice, setPurchasePrice] = useState(props.historicalPrices.historical[0].close);
  const [quantity, setQuantity] = useState(12);
  const [ticker,setTicker] = useState(props.historicalPrices.symbol);
  
  let quantityHeld = 0;

  const sellStock = (stockDetails) => {
    const url = urlcat(BACKEND, `/api/holding/updatedSalesLog/${dataContext.username}`);

    fetchData(
      url,
      "PUT",
      {"Content-Type": "application/json"},
      JSON.stringify({"salesLog":stockDetails}),
      (data)=>{return null}
      )
  };

  const sellStock2 = (stockBalanceStateValue) => {
    const url3 = urlcat(BACKEND, `/api/holding/updatedStockBalance/${dataContext.username}`);

    fetchData(
      url3,
      "PUT",
      {"Content-Type": "application/json"},
      JSON.stringify({
        "stockBalance" : stockBalanceStateValue,
        "cashBalance" : dataContext.cashBalance + (Number(quantity) * Number(purchasePrice)),
      }),
      (data)=>{return null}
      )
  };

  const updateStockBalance = (ticker,quantity) => {
    let newState = null;
    const oldStock = dataContext.stockBalance.find(x => x.ticker === ticker)
    if (oldStock) {
      const otherStocks = dataContext.stockBalance.filter(x => x.ticker !== ticker)
      props.setQuantityHeld(Number(oldStock.quantity) - Number(quantity))
      if ((Number(oldStock.quantity) - Number(quantity))== 0) {
        newState = [ ...otherStocks]
      } else {
        const newStock = { ...oldStock, quantity: Number(oldStock.quantity) - Number(quantity)}
        newState = [ ...otherStocks, newStock]
      }
      
    } else {
      const newStock = { ticker, quantity:Number(quantity)}
      newState = [...dataContext.stockBalance, newStock]
    }
    sellStock2(newState)
    props.dispatch({type:"UPDATE-STOCKBALANCE",value:newState})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted!")
    const stockDetails = { date, ticker, quantity, purchasePrice };
    sellStock(stockDetails);
    updateStockBalance(ticker,quantity)
    props.dispatch({type:"UPDATE-CASHBALANCE",value: dataContext.cashBalance  + (Number(quantity) * Number(purchasePrice))})
  };


  // might need to store current state of logged in user on the superparent level
  for (let stock of dataContext.stockBalance) {
    if (stock.ticker == props.historicalPrices.symbol) {
      quantityHeld = stock.quantity
    } else {
      quantityHeld = 0;
    }
  }

  //sets the 'default' fields in the form
  const [formData, setFormData] = useState({
    Quantity: 0,
    price: 0,
  });

  //makes input controlled - updates whenever something is typed
  const handleChange = (event) => {
    const name = event.target.name; //refers to input name
    setFormData({ ...formData, [name]: event.target.value, price: event.target.value }); //name is in sq brackets is to refer to variable in this scope (this.name)
    setQuantity(event.target.value)
  };

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit}
      >
        <label>
          Sell Quantity : |  
          <input className="input-quantity"
            name="Quantity"
            placeholder="qty"
            onChange={handleChange}
            type="number"
          />
          |
        </label>
        <div>Total Proceeds: {(formData.price * props.historicalPrices.historical[0].close).toLocaleString('en', {useGrouping:true})}</div>
      {
          (quantity) <= props.quantityHeld ?
          <input className="buy-button" type="submit" value="Sell" /> :
          <div className="funds-exceeded">Insufficient Stocks (Max:{(props.quantityHeld).toLocaleString('en', {useGrouping:true})})</div>
      }
      </form>
    </div>
  );
}
export default Form;
