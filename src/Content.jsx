import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import Navigation from './Navigation.jsx';
import Home from './Home';
import Income from './Income'
import Expenses from './Expenses'
import MainLayout from './layout/MainLayout.jsx'
import Category from './Category'
import CategorySelect from './CategorySelect'
import FilterByCate from './FilterByCate'
import Homedetails from './Homedetails';
//moneyArr, cate, nextID update and save to localstorage

export default function Content({ LSMoneyArr, LSCateArr }) {
  // console.log({ LSMoneyArr, LSCateArr });
  let nextIdLS = JSON.parse(localStorage.getItem("NextId"))
  // let cateLS = JSON.parse(localStorage.getItem("Cate"))
  let initiarr = []
  let initicate = [{ cate: "Foods", ioo: "out" }, { cate: "Transport", ioo: "out" }, { cate: "Salary", ioo: "in" }]
  //let storedMA
  // let storedMA = JSON.parse(localStorage.getItem('MoneyArr'))
  // fix el.time.getMonth
  const [money, setMoney] = useState(0)
  const [moneyArr, setMoneyArr] = useState(LSMoneyArr || initiarr)
  const [inputMoney, setInputMoney] = useState("")
  const [inorout, setInorout] = useState("in")
  const [cate, setCate] = useState(LSCateArr || initicate)
  const [incomeArr, setIncomeArr] = useState([])
  const [outcomeArr, setOutcomeArr] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [day, setDay] = useState()
  const [chooseCate, setChooseCate] = useState("Salary")
  const [nextId, setNextId] = useState(nextIdLS || 0)
  const [showT, setShowT] = useState(false)
  //moneyArr, cate, nextID update and save to localstorage
  //use useEffect =>localStorage.setItem('MoneyArr', JSON.stringify(moneyArr));

  function handleAdd() {
    console.log(inputMoney)
    console.log(inorout)
    console.log(chooseCate)
    console.log(nextId)
    console.log(localStorage.getItem("MoneyArr"))
  }

  useEffect(() => {
    const amount = inputMoney !== '' ? +inputMoney : 0;
    setMoney(moneyArr.filter((el) => el.inoroutC == "in").reduce((a, c) => a + +c.money, 0) - +moneyArr.filter((el) => el.inoroutC == "out").reduce((a, c) => a + +c.money, 0))
    localStorage.setItem('MoneyArr', JSON.stringify(moneyArr))
    localStorage.setItem("NextId", JSON.stringify(nextId))
  }, [moneyArr])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("Cate", JSON.stringify(cate))
  }, [cate])

  function handleIAdd(e) {
    e.preventDefault()

    setNextId(n => n + 1)
    if (inputMoney == "") {
      alert("Please enter amount")
    } else {
      setMoneyArr([
        ...moneyArr,
        {
          id: nextId,
          money: +inputMoney,
          category: chooseCate,
          inoroutC: inorout,
          time: currentTime
        },
      ])
      inorout === "in" ? setIncomeArr([...incomeArr,
      {
        id: nextId,
        money: +inputMoney,
        category: chooseCate,
        inoroutC: "in",
        time: currentTime
      }]) :
        setOutcomeArr([...outcomeArr,
        {
          id: nextId,
          money: +inputMoney,
          category: chooseCate,
          inoroutC: "out",
          time: currentTime
        }])
    }
    setInputMoney("");
  }

  function handleInorout(e) {
    setInorout(e.target.value)
    setChooseCate(cate.filter((el) => el.ioo == e.target.value)[0].cate)
    console.log(e.target.value)
  }

  function handleChooseCate(e) {
    setChooseCate(e.target.value)
  }

  // function handleAddCate(e) {
  //   setCateArr([...cate,
  //   { "cate": e.target.value, "ioo": inorout }])
  //   console.log(cate)
  // }

  function displayTable() {
    setShowT(!showT)
  }

  function calBal() {
    return moneyArr.filter((el) => el.inoroutC == "in").reduce((a, c) => a + c.money, 0) - moneyArr.filter((el) => el.inoroutC == "out").reduce((a, c) => a + c.money, 0)
  }

  let disT = showT ? "block" : "none"

  return (
    <div>
      <div className="Summary">
        <div className="SummaryRow">
          <p>Income :</p>
          <p className="incomeP">HK$ {moneyArr.filter((el) => el.inoroutC == "in").reduce((a, c) => a + c.money, 0)}</p>
        </div>
        <div className="SummaryRow summaryOfExpenses">
          <p >Expenses : </p>
          <p className="expensesP">HK$ {moneyArr.filter((el) => el.inoroutC == "out").reduce((a, c) => a + c.money, 0)}</p>
        </div>
        <div className="SummaryRow summaryOf">
          <p>Balance : </p>
          <p className={calBal() >= 0 ? "incomeP" : "expensesP"}> HK$ {calBal()} </p>
        </div>
      </div>
      {/* {money}
      <button type="button" onClick={handleAdd}>Log</button> */}
      <br />
      <Homedetails moneyArr={moneyArr} cate={cate} />
      {/* <Home Arr={moneyArr} cate={cate} /> */}
      <table className="tableStyle" style={{ display: disT }}>
        <tbody >
          <tr>
            <td><span><img src="./src/img/Entry.png" /></span></td>
            <td>
              <select onChange={handleInorout} className="typeOfInput" >
                <option value="in">Income</option>
                <option value="out">Expenses</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><span><img src="./src/img/Category.png" /></span></td>
            <td>
              <Category cate={cate} setCate={setCate} handleChooseCate={handleChooseCate} inorout={inorout} setMoneyArr={setMoneyArr} moneyArr={moneyArr} />
            </td>
          </tr>
          <tr>
            <td><span><img src="./src/img/Amount.png" /></span></td>
            <td> <input type="text" onChange={(e) => setInputMoney(e.target.value)} value={inputMoney} placeholder="e.g. 180" className="inputAmount"></input></td>
          </tr>
          <tr>
            <td><span><img src="./src/img/Date.png" /></span></td>
            <td>Default Today</td>
          </tr>
          <tr>
            {/* <td><span >Unknown</span></td> */}
            <td colSpan="2" style={{ textAlign: "center" }}><button type="button" onClick={handleIAdd} className="AddCatBtnStyle">Enter</button></td>
          </tr>
        </tbody>
      </table>

      <a onClick={displayTable} href="#"><img src={disT == "none" ? "./src/img/Add_icon.png" : "/src/img/Collapse.png"} className="addItemCircle" /></a>
      {/* <a href="#" className="addBox" style={{ display: "none" }}>
        <div className="addItemCircle2" >
          <div style={{ postion: "relative" }}>
            <div className="horiLine"></div>
            <div className="vertLine"></div>
          </div>

        </div></a> */}
      {/* <div style={{ display: "flex", justifyContent: "space-between", padding: "100px" }}>
        <div className="datadiv">
          data
        </div>
        <div className="detailsdiv">
          details
        </div>
      </div> */}
    </div>
  )
}