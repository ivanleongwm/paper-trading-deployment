import React, { useState } from "react";
import './ControlledForm.css'
import urlcat from "urlcat";
import { BACKEND } from "../../../utils/utils";

function Form(props) {
  const [error, setError] = useState("");
  const [date, setCurrentDate] = useState(props.historicalPrices.historical[0].date);
  const [purchasePrice, setPurchasePrice] = useState(props.historicalPrices.historical[0].close);
  const [quantity, setQuantity] = useState(12);
  const [username, setUsername] = useState(props.username);
  const [ticker,setTicker] = useState(props.historicalPrices.symbol);
  // create a function that makes a post request when the buy button is clicked
  const url = urlcat(BACKEND, `/api/holding/updatedSalesLog/${username}`);
  const url3 = urlcat(BACKEND, `/api/holding/updatedStockBalance/${username}`);
  
  let quantityHeld = 0;

  const sellStock = (stockDetails) => {
    fetch(url, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"salesLog":stockDetails}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => console.log(error));
  };

  const sellStock2 = (stockBalanceStateValue) => {
    // puts new stockBalance array into Stock Balance
    fetch(url3, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "stockBalance" : stockBalanceStateValue,
        "cashBalance" : props.cashBalance + (Number(quantity) * Number(purchasePrice)),
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

  const updateStockBalance = (ticker,quantity) => {
    let newState = null;
    console.log("STOCKBALANCEORIGINAL",props.stockBalanceOriginalState)
    const oldStock = props.stockBalanceOriginalState.find(x => x.ticker === ticker)
    if (oldStock) {
      const otherStocks = props.stockBalanceOriginalState.filter(x => x.ticker !== ticker)
      props.setQuantityHeld(Number(oldStock.quantity) - Number(quantity))
      if ((Number(oldStock.quantity) - Number(quantity))== 0) {
        newState = [ ...otherStocks]
      } else {
        const newStock = { ...oldStock, quantity: Number(oldStock.quantity) - Number(quantity)}
        newState = [ ...otherStocks, newStock]
      }
      
    } else {
      const newStock = { ticker, quantity:Number(quantity)}
      newState = [...props.stockBalanceOriginalState, newStock]
    }
    sellStock2(newState)
    props.setStockBalanceOriginalState(newState)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted!")
    const stockDetails = { date, ticker, quantity, purchasePrice };
    sellStock(stockDetails);
    updateStockBalance(ticker,quantity)
    props.setCashBalance(props.cashBalance + (Number(quantity) * Number(purchasePrice)))
  };

  // with the current date, today's price and quantity, username
  


  // might need to store current state of logged in user on the superparent level
  for (let stock of props.secret.stockBalance) {
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
        <p>{error}</p>
      </form>
    </div>
  );
}
export default Form;
