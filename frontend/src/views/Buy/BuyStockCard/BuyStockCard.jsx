import MiniChart from '../MiniChart/MiniChart'
import './BuyStockCard.css'
import Form from '../Form/ControlledForm'

export default function BuyStockCard ({ dispatch, stockHistoricalPrices}) {

    return (
        <div className="card-container">
            <div className="text-content">{stockHistoricalPrices.symbol}</div>
            <div className="text-content">{stockHistoricalPrices.historical[0].close}</div>
            <div className="text-content">{stockHistoricalPrices.historical[0].change}</div>
            <div className="mini-chart-container">
                <MiniChart historicalPrices={stockHistoricalPrices.historical.slice(0,20)}/>
            </div>
            <Form dispatch={dispatch} historicalPrices={stockHistoricalPrices}/>
        </div>
    )
}
