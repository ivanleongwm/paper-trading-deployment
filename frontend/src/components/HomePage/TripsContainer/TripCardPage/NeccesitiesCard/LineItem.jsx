import {Form} from 'react-bootstrap'
import {useState} from 'react'
import './LineItem.css'

function NecessityCard ({name , quantity, checked, essentialItemsCount, setEssentialItemsCount,allThingsForTrip, setAllThingsForTrip,cardName, onNeccesitiesChange}) {

    const handleChangeCount = (event) =>{
        if (event.target.type === 'number') {
            setEssentialItemsCount({
                ...essentialItemsCount,
                [event.target.getAttribute("name")] : 
                [event.target.value,essentialItemsCount[event.target.getAttribute("name")][1]]
            })
            setAllThingsForTrip({...allThingsForTrip,[cardName]:{
                ...essentialItemsCount,
                [event.target.getAttribute("name")] : 
                [event.target.value,essentialItemsCount[event.target.getAttribute("name")][1]]}})
            onNeccesitiesChange({...allThingsForTrip,[cardName]:{
                ...essentialItemsCount,
                [event.target.getAttribute("name")] : 
                [event.target.value,essentialItemsCount[event.target.getAttribute("name")][1]]}})
            console.log(event)
            console.log(event.target.getAttribute("name"))
            console.log(event.target.value)
        } else if (event.target.type === 'checkbox') {
            setEssentialItemsCount({
                ...essentialItemsCount,
            [event.target.getAttribute("name")] : 
            [essentialItemsCount[event.target.getAttribute("name")][0],event.target.checked]
            })
            setAllThingsForTrip({...allThingsForTrip,[cardName]:{
                ...essentialItemsCount,
            [event.target.getAttribute("name")] : 
            [essentialItemsCount[event.target.getAttribute("name")][0],event.target.checked]
            }})
            onNeccesitiesChange({...allThingsForTrip,[cardName]:{
                ...essentialItemsCount,
            [event.target.getAttribute("name")] : 
            [essentialItemsCount[event.target.getAttribute("name")][0],event.target.checked]
            }})
            console.log(event)
            console.log(event.target.getAttribute("name"))
            console.log(event.target.checked)
        }
    }

    const handleCrossDelete = (event) => {
        // fix the glitch where when there's only one item left. the entire category gets deleted
        const items = {...essentialItemsCount}
        delete items[event.target.getAttribute("name")]
        setEssentialItemsCount({...items})
        setAllThingsForTrip({...allThingsForTrip,[cardName]:{
            ...items
        }})
        onNeccesitiesChange({...allThingsForTrip,[cardName]:{
            ...items
        }})
        console.log("delete all things",allThingsForTrip)
    }

    return (
        <div className="line-item">
            <Form>
                <div key='checkbox' className="mb-3">
                    <Form.Check 
                        type='checkbox'
                        id='default-checkbox'
                        name={name}
                        checked={checked}
                        onChange={(event) => {handleChangeCount(event)}}
                    />
                </div>
            </Form>
            <input className="input-quantity"
                name={name}
                value={quantity}
                type="number"
                min="1"
                maxlength="4" 
                size="4"
                onChange={(event) => {handleChangeCount(event)}}
            />
            <div>
                {name}
            </div>
            <span class="close" name={name} onClick={(event)=> {handleCrossDelete(event)}}>x</span>
        </div>
    )
}

export default NecessityCard;