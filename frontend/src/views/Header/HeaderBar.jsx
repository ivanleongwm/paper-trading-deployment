import './HeaderBar.css'
import {useNavigate} from 'react-router-dom'
import {DataContext} from '../../App'
import {useContext} from 'react'

export default function HeaderBar({dispatch,originalEmptyDatastoreObject}) {
    const dataContext = useContext(DataContext)

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        sessionStorage.removeItem("username");
        setTimeout(()=> {
            window.location.href = '/'
           }, 1000);
        dispatch(originalEmptyDatastoreObject);
        console.log("logged out of user:",sessionStorage.getItem("username"))
      };

    return (
        <div className="headerContainer">
            <div className="fixedElement">
            {
                (sessionStorage.getItem("username") == null) ? 
                <div className="loggedInUserPlaceholder"></div>
                :
                <div className="loggedInUser">
                    <div className="userDetails">
                        Logged In: {sessionStorage.getItem("username")}
                    </div>
                    <div className="userDetails">
                        Cash Balance: {dataContext.cashBalance.toFixed(2)}
                    </div>
                </div>
            }
                <div className="title">
                    PAPER TRADE
                </div>
                <div className="links">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                    <div onClick={handleSubmit} className="logout">Log Out</div>
                </div>
            </div>
        </div>
        
    )
}