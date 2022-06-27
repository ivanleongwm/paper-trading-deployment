import MiniChart from '../MiniChart/MiniChart'
import './BuyStockCard.css'
import Form from '../Form/ControlledForm'
import { useState } from 'react';
import productsArr from '../Form/products';

export default function BuyStockCard ({stockHistoricalPrices, userAccountData,  secret,  setSecret, username,stockBalanceOriginalState,setStockBalanceOriginalState, cashBalance, setCashBalance }) {

    const [products, setProducts] = useState(productsArr);

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

    return (
        <div className="card-container">
            <div className="text-content">{stockHistoricalPrices.symbol}</div>
            <div className="text-content">{stockHistoricalPrices.historical[0].close}</div>
            <div className="text-content">{stockHistoricalPrices.historical[0].change}</div>
            <div className="mini-chart-container">
                <MiniChart historicalPrices={stockHistoricalPrices.historical.slice(0,20)}/>
            </div>
            <Form handleSubmit={handleSubmit} historicalPrices={stockHistoricalPrices} userAccountData={userAccountData} secret={secret} setSecret={setSecret} username={username} stockBalanceOriginalState={stockBalanceOriginalState} setStockBalanceOriginalState={setStockBalanceOriginalState} cashBalance={cashBalance} setCashBalance={setCashBalance}/>
        </div>
    )
}


//<div className="text-content">{stockHistoricalPrices.price}</div>
//<div className="text-content">{stockHistoricalPrices.twentyFourHourChange}</div>

