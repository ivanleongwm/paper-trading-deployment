import './App.css';
import JunkContent from './views/JunkContent';
import HeaderBar from './views/Header/HeaderBar';
import FooterBar from './views/FooterBar/FooterBar';
import Portfolio from './views/Portfolio/Portfolio';
import RegisterForm from './views/Forms/RegisterForm/RegisterForm'
import LoginForm from './views/Forms/LoginForm/LoginForm'
import LoginSuccessful from './views/Forms/LoginSuccess/LoginSuccess';
import FormDataDisplay from './views/Forms/FormDataDisplay/FormDataDisplay';
import PieChartColorsUpdate from './views/PieChart/PieChartColorUpdate';
import UserProfile from './views/User Profile/userProfile';
import Buy from './views/Buy/Buy'
import Sell from './views/Sell/Sell'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useState} from 'react';

function App() {
  const [secret, setSecret] = useState({
    user: "",
    purchaseLog:[]
  });
  const [cashBalance, setCashBalance] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <HeaderBar cashBalance={cashBalance} setCashBalance={setCashBalance}/>
          <Routes>
            <Route path="/" element={<Portfolio />}/>
            <Route path="/buy" element={<Buy secret={secret} setSecret={setSecret} cashBalance={cashBalance} setCashBalance={setCashBalance} />}/>
            <Route path="/sell" element={<Sell secret={secret} setSecret={setSecret} cashBalance={cashBalance} setCashBalance={setCashBalance}/>}/>
            <Route path="/loginsuccessful" element={<LoginSuccessful secret={secret} setSecret={setSecret} cashBalance={cashBalance} setCashBalance={setCashBalance}/>}/>
            <Route path="/register" element={<RegisterForm cashBalance={cashBalance} setCashBalance={setCashBalance} />}/>
            <Route path="/login" element={<LoginForm cashBalance={cashBalance} setCashBalance={setCashBalance} />}/>
            <Route path="/display" element={<FormDataDisplay/>}/>
            <Route path="/piechart" element={<PieChartColorsUpdate/>}/>
            <Route path="/userprofile" element={<UserProfile  cashBalance={cashBalance} setCashBalance={setCashBalance} />}/>
          </Routes>
          <FooterBar />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

/*
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RandomCardPage from './pages/RandomCardPage'

function App() {
  const [count, setCount] = useState(0)
  //React router, if you go to that page then that element shows up, it you don't go to that path then it doesn't show up
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/magic-the-gathering-react-api" element={<MainPage />}/>
        <Route path="/home" element={<MainPage />}/>
        <Route path="/card" element={<RandomCardPage />}/>
        <Route path="/card/:id" element={<RandomCardPage />}/>
      </Routes>
    </BrowserRouter>
  )
}
*/