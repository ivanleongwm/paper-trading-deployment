import {Form} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import LineItem from './LineItem'
import './NecessityCard.css'
import {Paper,Box} from '@mui/material';

const essentialsCount = {
    "medications" : [1,false],
    "passport" : [1,false],
    "visa" : [1,false],
    "wallet" : [1,false],
    "water bottle" : [1,false]
}

function NecessityCard ({cardName,cardData,allThingsForTrip,setAllThingsForTrip,onNeccesitiesChange}) {
    const [essentialItemsCount,setEssentialItemsCount] = useState(cardData)
    const [addItemData, setAddItemData] = useState({
        quantity: 1,
        description: "",
      });

    useEffect(()=> {
        console.log("parent",essentialItemsCount)
    },[essentialItemsCount])

    const handleChange = (event) => {
        const name = event.target.name; //refers to input name
        const payload = { ...addItemData, [name]: event.target.value }
        setAddItemData(payload); //name is in sq brackets is to refer to variable in this scope (this.name)
        //onNeccesitiesChange(payload)
        console.log("added item form change",addItemData);
      };

    return (
        <div className="necessity-card">
                <h3>{cardName}</h3>
                <br/>
            {
                Object.keys(essentialItemsCount).map(function(key, index) {
                    return <LineItem key={index } name={key} quantity={essentialItemsCount[key][0]} 
                    checked={essentialItemsCount[key][1]} setEssentialItemsCount={setEssentialItemsCount} 
                    essentialItemsCount={essentialItemsCount} setAllThingsForTrip={setAllThingsForTrip}
                    allThingsForTrip={allThingsForTrip} cardName={cardName} onNeccesitiesChange={onNeccesitiesChange}
                    />
                })
            }
            <form
            onSubmit={(event) => {
                event.preventDefault()
                const payload = {...allThingsForTrip,[cardName]:{
                    ...allThingsForTrip[cardName],
                    [addItemData["description"]]: [addItemData["quantity"],false]
                }}
                setEssentialItemsCount({...essentialItemsCount,
                [addItemData["description"]]: [addItemData["quantity"],false]})
                setAllThingsForTrip(payload)
                onNeccesitiesChange(payload)
                setAddItemData({
                    quantity: 1,
                    description: "",
                  })
                }
            }
        >
        <label>
          Add item:
        </label>
        <input
        name="quantity"
        placeholder="1"
        onChange={(event) => {handleChange(event)}}
        type="number"
        value={addItemData["quantity"]}
        />
        <input
            name="description"
            placeholder="description"
            onChange={(event) => {handleChange(event)}}
            type="text"
            value={addItemData["description"]}
          />
        <input type="submit" value="Submit" />
      </form>
        <br/>
        </div>

    )
}

export default NecessityCard;