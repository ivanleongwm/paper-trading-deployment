import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {useState} from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const username = sessionStorage.getItem("username");

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<div>Hello World</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
