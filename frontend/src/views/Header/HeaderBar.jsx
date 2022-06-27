import './HeaderBar.css'
import {useNavigate} from 'react-router-dom'

export default function HeaderBar({cashBalance,setCashBalance}) {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("logged out of user:",sessionStorage.getItem("username"))
        sessionStorage.removeItem("username");
        setTimeout(()=> {
            navigate("/login");
           }, 1000);
        setCashBalance(0.00);
      };

    return (
        <div className="headerContainer">
            <div className="fixedElement">
                <div className="loggedInUser">
                    <div className="userDetails">
                        Logged In: {sessionStorage.getItem("username")}
                    </div>
                    <div className="userDetails">
                        Cash Balance: {cashBalance.toFixed(2)}
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