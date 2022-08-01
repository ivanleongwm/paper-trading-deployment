import React, { useState , useContext } from "react";
import './ControlledForm.css'
import urlcat from "urlcat";
import { BACKEND } from "../../../utils/utils";
import {DataContext} from '../../../App'
import fetchData from '../../fetch'

function Form(props) {
  const dataContext = useContext(DataContext);
  const [date, setCurrentDate] = useState(props.historicalPrices.historical[0].date);
  const [purchasePrice, setPurchasePrice] = useState(props.historicalPrices.historical[0].close);
  const [quantity, setQuantity] = useState(0);
  const [ticker,setTicker] = useState(props.historicalPrices.symbol);

  // create a function that makes a post request when the buy button is clicked

  const buyStock = (stockDetails) => {
    const url = urlcat(BACKEND, `/api/holding/updatedPurchaseLog/${dataContext.username}`);

    fetchData(
      url,
      "PUT",
      {"Content-Type": "application/json"},
      JSON.stringify({"purchaseLog":[stockDetails]}),
      (data)=>{return null}
      )
  };

  const buyStock2 = (stockBalanceStateValue) => {
    const url3 = urlcat(BACKEND, `/api/holding/updatedStockBalance/${dataContext.username}`);
    fetchData(
      url3,
      "PUT",
      {"Content-Type": "application/json"},
      JSON.stringify({
        "stockBalance" : stockBalanceStateValue,
        "cashBalance" : dataContext.cashBalance - (Number(quantity) * Number(purchasePrice)),
      }),
      (data)=>{return null}
      )
  };

  const updateStockBalance = (ticker,quantity) => {
    let newState = null;
    const oldStock = dataContext.stockBalance.find(x => x.ticker === ticker)
    if (oldStock) {
      const otherStocks = dataContext.stockBalance.filter(x => x.ticker !== ticker)
      const newStock = { ...oldStock, quantity: Number(oldStock.quantity) + Number(quantity)}
      newState = [ ...otherStocks, newStock]
    } else {
      const newStock = { ticker, quantity:Number(quantity)}
      newState = [...dataContext.stockBalance, newStock]
    }

    buyStock2(newState)
    props.dispatch({type:"UPDATE-STOCKBALANCE",value:newState})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const stockDetails = { date, ticker, quantity, purchasePrice };
    console.log("Session storage in buy",sessionStorage.getItem("cashBalance"),"quantity",Number(quantity),"Purchase price",Number(purchasePrice))
    props.dispatch({type:"UPDATE-CASHBALANCE",value: dataContext.cashBalance  - (Number(quantity) * Number(purchasePrice))})
    buyStock(stockDetails);
    updateStockBalance(ticker,quantity)
  };

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
          (formData.price * props.historicalPrices.historical[0].close) < dataContext.cashBalance ?
          <input className="buy-button" type="submit" value="Buy" /> :
          <div className="funds-exceeded">Insufficient Funds (Max:{(dataContext.cashBalance).toLocaleString('en', {useGrouping:true})})</div>
      }
      </form>
    </div>
  );
}

export default Form;
