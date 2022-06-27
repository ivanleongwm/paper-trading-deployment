import { useState, useEffect } from "react";
import urlcat from "urlcat";
import { BACKEND } from "../../utils/utils";
import { useNavigate } from "react-router-dom";



function PieChartColorsUpdate() {
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
  const LoginAccount = (register) => {
    const url = urlcat(BACKEND, `/api/piechart/${secret.user}`);
    fetch(url, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({[colour]:hexColourCode}),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        loginIsSuccessful(data.message)
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const login = { colour, hexColourCode };
    LoginAccount(login);
  };

  return (
    <body>
      <h1>o</h1>
      <h2>Change Pie Chart Colors:</h2>
      <p>Enter colour1 to colour6, and specify color</p>
      <>
        <form onSubmit={handleSubmit}>
          Color: 
          <input
            type="text"
            name="username"
            value={colour}
            onChange={(event) => setColour(event.target.value)}
          />
          <br />
          <br />
          HexaDecimal Code: 
          <input
            type="text"
            name="email"
            value={hexColourCode}
            onChange={(event) => setHexColourCode(event.target.value)}
          />
          <p>{error}</p>
          <br />
          <button>Change Color Code</button>
        </form>
      </>
    </body>
  );
}

export default PieChartColorsUpdate;
