import './HeaderBar.css'
import {useNavigate} from 'react-router-dom'
import {DataContext} from '../../App'
import {useContext} from 'react'

export default function HeaderBar({dipatch}) {
    const dataContext = useContext(DataContext)

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("logged out of user:",sessionStorage.getItem("username"))
        sessionStorage.removeItem("username");
        setTimeout(()=> {
            navigate("/login");
           }, 1000);
        dipatch({type:"UPDATE-CASHBALANCE",value:0.00});
      };

    return (
        <div className="headerContainer">
            <div className="fixedElement">
                <div className="loggedInUser">
                    <div className="userDetails">
                        Logged In: {sessionStorage.getItem("username")}
                    </div>
                    <div className="userDetails">
                        Cash Balance: {dataContext.cashBalance.toFixed(2)}
                    </div>
                </div>
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