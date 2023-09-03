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
  let initicate = [{ cate: "Foods", ioo: "out" }, { cate: "Transport", ioo: "out" }, { cate: "Salary", ioo: "in" }];
  let democate = [{"cate":"Foods","ioo":"out"},{"cate":"Transport","ioo":"out"},{"cate":"Salary","ioo":"in"},{"cate":"DemoIncome","ioo":"in"},{"cate":"DemoExpenses","ioo":"out"}]
  let demoarr = [{"id":0,"money":100,"category":"DemoIncome","inoroutC":"in","time":"2023-09-02T07:28:45.639Z"}
  ,{"id":1,"money":200,"category":"DemoIncome","inoroutC":"in","time":"2023-09-02T07:28:51.631Z"},
  {"id":2,"money":100,"category":"DemoIncome","inoroutC":"in","time":"2023-09-02T07:28:54.631Z"},
  {"id":3,"money":300,"category":"DemoIncome","inoroutC":"in","time":"2023-01-02T07:28:55.632Z"},
  {"id":4,"money":255,"category":"DemoIncome","inoroutC":"in","time":"2023-02-02T07:28:57.632Z"},
  {"id":5,"money":600,"category":"DemoIncome","inoroutC":"in","time":"2023-03-02T07:28:58.632Z"},
  {"id":6,"money":100,"category":"DemoIncome","inoroutC":"in","time":"2023-04-02T07:29:03.631Z"},
  {"id":7,"money":200,"category":"DemoIncome","inoroutC":"in","time":"2023-05-02T07:29:05.644Z"},
  {"id":8,"money":300,"category":"DemoIncome","inoroutC":"in","time":"2023-06-02T07:29:06.637Z"},{"id":9,"money":400,"category":"DemoIncome","inoroutC":"in","time":"2023-07-02T07:29:06.637Z"},{"id":10,"money":600,"category":"DemoIncome","inoroutC":"in","time":"2023-08-02T07:29:07.631Z"},{"id":11,"money":500,"category":"DemoIncome","inoroutC":"in","time":"2023-09-02T07:29:08.631Z"},{"id":12,"money":700,"category":"DemoIncome","inoroutC":"in","time":"2023-10-02T07:29:09.632Z"},{"id":13,"money":1000,"category":"DemoIncome","inoroutC":"in","time":"2023-11-02T07:29:11.643Z"},{"id":14,"money":2000,"category":"DemoIncome","inoroutC":"in","time":"2023-12-02T07:29:12.632Z"},{"id":15,"money":101,"category":"DemoExpenses","inoroutC":"out","time":"2023-01-02T07:29:27.634Z"},{"id":16,"money":201,"category":"DemoExpenses","inoroutC":"out","time":"2023-02-02T07:29:28.638Z"},{"id":17,"money":301,"category":"DemoExpenses","inoroutC":"out","time":"2023-03-02T07:29:29.635Z"},{"id":18,"money":401,"category":"DemoExpenses","inoroutC":"out","time":"2023-04-02T07:29:30.632Z"},{"id":19,"money":501,"category":"DemoExpenses","inoroutC":"out","time":"2023-05-02T07:29:32.641Z"},{"id":20,"money":601,"category":"DemoExpenses","inoroutC":"out","time":"2023-06-02T07:29:33.634Z"},{"id":21,"money":701,"category":"DemoExpenses","inoroutC":"out","time":"2023-07-02T07:29:35.638Z"},{"id":22,"money":801,"category":"DemoExpenses","inoroutC":"out","time":"2023-08-02T07:29:36.632Z"},{"id":23,"money":901,"category":"DemoExpenses","inoroutC":"out","time":"2023-09-02T07:29:37.631Z"},{"id":24,"money":1001,"category":"DemoExpenses","inoroutC":"out","time":"2023-10-01T07:29:38.631Z"},{"id":25,"money":1101,"category":"DemoExpenses","inoroutC":"out","time":"2023-11-01T07:29:40.632Z"},{"id":26,"money":1201,"category":"DemoExpenses","inoroutC":"out","time":"2023-12-01T07:29:41.636Z"},{"id":27,"money":12012022,"category":"DemoExpenses","inoroutC":"out","time":"2022-12-01T07:29:54.631Z"},{"id":28,"money":11012022,"category":"DemoExpenses","inoroutC":"out","time":"2022-11-01T07:30:00.631Z"},{"id":29,"money":12012022,"category":"DemoIncome","inoroutC":"in","time":"2022-12-01T07:49:23.778Z"},{"id":30,"money":11012022,"category":"DemoIncome","inoroutC":"in","time":"2022-11-01T07:49:33.780Z"}]
  let nextIdLS = JSON.parse(localStorage.getItem("NextId"))
  let LSMoneyArr = JSON.parse(localStorage.getItem("MoneyArr"))
  let LSCateArr = JSON.parse(localStorage.getItem("Cate"))
  const [moneyArr, setMoneyArr] = useState(LSMoneyArr || demoarr)
  const [cate, setCate] = useState(LSCateArr || democate)
  const [nextId, setNextId] = useState(nextIdLS || 30)
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
