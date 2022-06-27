import { useState, useEffect } from "react";
import urlcat from "urlcat";
import { BACKEND } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";



function LoginSuccessful({secret,setSecret,setCashBalance}) {
  const url = urlcat(BACKEND, `/api/users/loginsuccessful/${sessionStorage.getItem("username")}`);
  console.log("SESSION USERNAME STORED",sessionStorage.getItem("username"))
  
  const loginSuccessCheck = () => {
    fetch(url, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
          console.log("RESPONSE TEST JESS",response)
        return response.json()
      })
      .then((data) => {
        console.log("first data",data)
        setSecret({ ...secret, user: data.username, purchaseLog: data.purchaseLog, stockBalance: data.stockBalance })
        setCashBalance(data.cashBalance)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loginSuccessCheck()
    console.log("SECRET TEST1",secret)
  },[])

  return (
    <body>
      <h1>o</h1>
      <h1>Login Successful, Welcome { secret.user }!</h1>
    </body>
  );
}

//<h1>stock holdings: {secret.purchaseLog.toString()}</h1>
export default LoginSuccessful;