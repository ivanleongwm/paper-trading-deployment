import MiniChart from '../MiniChart/MiniChart'
import './SellStockCard.css'
import Form from '../Form/ControlledForm'
import { useState , useEffect } from 'react';
import productsArr from '../Form/products';

export default function BuyStockCard ({stockHistoricalPrices, userAccountData,  secret,  setSecret, username,stockBalanceOriginalState,setStockBalanceOriginalState, cashBalance, setCashBalance }) {

    const [products, setProducts] = useState(productsArr);
    const [quantityHeld,setQuantityHeld] = useState(0)

    const handleSubmit = (productName,productPrice,productDescription) => {
        setProducts([
          {
            name: productName,
            price: productPrice,
            description: productDescription,
          },
          ...products
        ])
      }
      
      useEffect(()=>{
        for (let stock of secret.stockBalance) {
          //console.log("SELLCARDSECRET",secret.stockBalance)
          if (stock.ticker == stockHistoricalPrices.symbol) {
            setQuantityHeld(stock.quantity)
            //console.log("HISTORICALPRICESSYMBOL",stockHistoricalPrices.symbol)
            console.log("ACTUALTICKERQTY",quantityHeld)
          } 
        }
      },[secret.stockBalance])
      

    return (
        <div className="card-container">
            <div className="text-content">{stockHistoricalPrices.symbol}</div>
            <div className="text-content">{stockHistoricalPrices.historical[0].close}</div>
            <div className="text-content">{quantityHeld}</div>
            <div className="mini-chart-container">
                <MiniChart historicalPrices={stockHistoricalPrices.historical.slice(0,20)}/>
            </div>
            <Form handleSubmit={handleSubmit} historicalPrices={stockHistoricalPrices} username={username} userAccountData={userAccountData} secret={secret} quantityHeld={quantityHeld} setQuantityHeld={setQuantityHeld} stockBalanceOriginalState={stockBalanceOriginalState} setStockBalanceOriginalState={setStockBalanceOriginalState} cashBalance={cashBalance} setCashBalance={setCashBalance}/>
        </div>
    )
}


//<div className="text-content">{stockHistoricalPrices.price}</div>
//<div className="text-content">{stockHistoricalPrices.twentyFourHourChange}</div>

