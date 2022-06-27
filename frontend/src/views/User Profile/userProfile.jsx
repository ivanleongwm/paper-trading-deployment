import { useState, useEffect } from "react";
import urlcat from "urlcat";
import { BACKEND } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import './userProfile.css'



function UserProfile({setCashBalance}) {
  const url1 = urlcat(BACKEND, `/api/users/loginsuccessful/${sessionStorage.getItem("username")}`);

  const [error, setError] = useState("");
  const [colour, setColour] = useState("");
  const [hexColourCode, setHexColourCode] = useState("");
  const [isLogin, setLogin] = useState("Not Logged In");
  const [secret, setSecret] = useState({
    user: "",
    purchaseLog:[],
    stockBalance:[]
  });
  let navigate = useNavigate();
  const [purchaseLog,setPurchaseLog] = useState([
  ]);
  const [salesLog, setSalesLog] = useState([])

  const loginSuccessCheck = () => {
    fetch(url1, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
          console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log("first data",data)
        setPurchaseLog(data.purchaseLog)
        setSalesLog(data.salesLog)
        setSecret({ ...secret, user: data.username, purchaseLog: data.purchaseLog, stockBalance: data.stockBalance })
        })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loginSuccessCheck()
  },[])

  const loginIsSuccessful = (dataResponse) => {
    if (dataResponse == "Valid password") {
      navigate("/loginsuccessful");
    }
  }

// react frontend  
  const DeleteAccount = (register) => {
    const url = urlcat(BACKEND, `/api/users/${secret.user}`);
    fetch(url, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setTimeout(()=> {
          setCashBalance(0.00);
          sessionStorage.removeItem("username");
          navigate("/login");
         }, 1000);
        //loginIsSuccessful(data.message)
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    DeleteAccount();
  };

  return (
    <body>
      <h1>o</h1>
      <div>User: {secret.user}</div>
      <>
        <form onSubmit={handleSubmit}>
          <button>Delete User Account</button>
        </form>
      </>
      <br></br>
      <h4>Purchase Log</h4>
      <table>
        <tr key={"header1"}>
          <th>Date</th>
          <th>Ticker</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>ID</th>
        </tr>
        {purchaseLog.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
      </table>
      <h4>Sales Log</h4>
      <table>
        <tr key={"header1"}>
          <th>Date</th>
          <th>Ticker</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>ID</th>
        </tr>
        {salesLog.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
      </table>
    </body>
  );
}

export default UserProfile;
