import MiniChart from '../MiniChart/MiniChart'
import './SellStockCard.css'
import Form from '../Form/ControlledForm'
import { useState , useEffect, useContext } from 'react';
import {DataContext} from '../../../App';

export default function BuyStockCard ({dispatch,stockHistoricalPrices}) {
    const dataContext = useContext(DataContext)
    const [quantityHeld,setQuantityHeld] = useState(0)
      
      useEffect(()=>{
        for (let stock of dataContext.stockBalance) {
          if (stock.ticker == stockHistoricalPrices.symbol) {
            setQuantityHeld(stock.quantity)
          } 
        }
      },[dataContext.stockBalance])

    return (
        <div className="card-container">
            <div className="text-content">{stockHistoricalPrices.symbol}</div>
            <div className="text-content">{stockHistoricalPrices.historical[0].close}</div>
            <div className="text-content">{quantityHeld}</div>
            <div className="mini-chart-container">
                <MiniChart historicalPrices={stockHistoricalPrices.historical.slice(0,20)}/>
            </div>
            <Form dispatch={dispatch} historicalPrices={stockHistoricalPrices} quantityHeld={quantityHeld} setQuantityHeld={setQuantityHeld} />
        </div>
    )
}


