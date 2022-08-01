import TopSpacer from "../Header/TopSpacer";
import userAccountData from "../../model/userAccountData";
import BuyStockCard from "./BuyStockCard/BuyStockCard";
import './Buy.css';
import {useContext} from 'react';
import {DataContext} from '../../App'

export default function Buy({dispatch}) {
    const dataContext = useContext(DataContext)

    return (
        <div>
            <TopSpacer />
            <div className="buy-container">
            {dataContext.stock.length > 0 ? null : <div className="loader" id="loader"></div>}
                {
                  dataContext.stock.map((x, i) => {
                    return (
                    <BuyStockCard key={i} dispatch={dispatch} stockHistoricalPrices={dataContext.stock[i]} userAccountData={userAccountData} />);
                  })
                }
            </div>
        </div>
    )
}
