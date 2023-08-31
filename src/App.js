import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import App_icon from './img/App_icon.png'
import './App.css';
import { useState, useEffect } from 'react';
import Home from "./Home.jsx"
import Income from "./Income.jsx"
import Expenses from './Expenses';
// import Expenses from "./Expenses.jsx"
import React, {useContext} from 'react'
import {ContextC} from './ContextC'

function App() {
  let initiarr = []
  let initicate = [{ cate: "Foods", ioo: "out" }, { cate: "Transport", ioo: "out" }, { cate: "Salary", ioo: "in" }]
  let nextIdLS = JSON.parse(localStorage.getItem("NextId"))
  let LSMoneyArr = JSON.parse(localStorage.getItem("MoneyArr"))
  let LSCateArr = JSON.parse(localStorage.getItem("Cate"))
  const [moneyArr, setMoneyArr] = useState(LSMoneyArr || initiarr)
  const [cate, setCate] = useState(LSCateArr || initicate)
  const [nextId, setNextId] = useState(nextIdLS || 0)
  const [page,setPage] = useState("home")
  function handleHomeBut () {
    setPage(n => 'home')
  }

  function handleIncomeBut (){
    setPage(n => "income")
  }

  function handleExpensBut (){
    setPage(n =>"expenses")
  }
  
  // useEffect(() =>{
  //   setMoneyArr(n => JSON.parse(localStorage.getItem("NextId")));
  //   setCate(n => JSON.parse(localStorage.getItem("MoneyArr")));
  //   setNextId(n => JSON.parse(localStorage.getItem("Cate")));
  //   },[page]);

  useEffect(() =>{
    nextIdLS = JSON.parse(localStorage.getItem("NextId"))
    LSMoneyArr = JSON.parse(localStorage.getItem("MoneyArr"))
    LSCateArr = JSON.parse(localStorage.getItem("Cate"));
    },[page]);

  return (
    <main>
    <div className="navbar">
      <div className="navContainer">
      <div >
      <img src={App_icon} className="pad5" /><span className="navBarTitle">MONEY PLANNER</span>

      </div>
      <div className="buttonHIE">
        <h1 onClick={handleHomeBut} className="hoverEffect">Home</h1>
        <h1 onClick={handleIncomeBut} className="hoverEffect" >Income</h1>
        <h1 onClick={handleExpensBut} className="hoverEffect">Expenses</h1>
      </div>
      </div>
    </div>
    <ContextC.Provider value={{moneyArr, setMoneyArr, cate, setCate, nextId, setNextId}}>
      {page === "home" && <Home />}
      {page === 'income' && <Income />}
      {page === 'expenses' && <Expenses />}
      {/* {page === "expenses" && <Expenses />} */}
      {/* direct to home and then to content  */}
    </ContextC.Provider>
    </main>
    
  );
}

export default App;
