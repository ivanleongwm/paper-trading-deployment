import TopSpacer from "../Header/TopSpacer";
import SellStockCard from "./SellStockCard/SellStockCard";
import './Sell.css';
import {useContext} from 'react';
import {DataContext} from '../../App';

export default function Sell({dispatch}) {
    const dataContext = useContext(DataContext)
 
    return (
        <div>
            <TopSpacer />
            <div className="buy-container">
            {dataContext.stock.length > 0 ? null : <div class="loader" id="loader"></div>}
                {
                    dataContext.stock.map((x, i) => {
                        return (<SellStockCard dispatch={dispatch} stockHistoricalPrices={dataContext.stock[i]}/>);
                      })
                }
            </div>
        </div>
    )
}
