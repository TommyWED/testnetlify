import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect, useContext} from 'react';
import Category from './Category'
import Homedetails from './Homedetails';
import CollapseImg from './img/Collapse.png'
import DateImg from './img/Date.png'
import EntryImg from './img/Entry.png'
import CategoryImg from './img/Category.png'; 
import AmountImg from './img/Amount.png'
import AddImg from './img/Add_icon.png'
import { ContextC} from './ContextC'

//moneyArr, cate, nextID update and save to localstorage

export default function Home() {
  const [inputMoney, setInputMoney] = useState("")
  const [inorout, setInorout] = useState("in")
  const [incomeArr, setIncomeArr] = useState([])
  const [outcomeArr, setOutcomeArr] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  const [chooseCate, setChooseCate] = useState("Salary")
  const [showT, setShowT] = useState(false)
  const { moneyArr, setMoneyArr, cate, setCate, nextId ,setNextId } = useContext(ContextC)
  function handleAdd() {
    console.log(inputMoney)
    console.log(inorout)
    console.log(chooseCate)
    console.log(nextId)
    console.log(localStorage.getItem("MoneyArr"))
  }
  
  useEffect(() => {
    const amount = inputMoney !== '' ? +inputMoney : 0;
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


  function displayTable() {
    setShowT(!showT)
  }

  function calBal() {
    return moneyArr.filter((el) => el.inoroutC == "in").reduce((a, c) => a + c.money, 0) - moneyArr.filter((el) => el.inoroutC == "out").reduce((a, c) => a + c.money, 0)
  }

  let disT = showT ? "block" : "none"
  let disT2 = showT ? "none" : "block"

  return (
    <div>
      <div>
        <h1 className="pageHeading">Home</h1>
      </div>
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
      <br />
      <Homedetails moneyArr={moneyArr} cate={cate} />
      <table className="tableStyle" style={{ display: disT }}>
        <tbody >
          <tr>
            <td><span><img src={EntryImg} /></span></td>
            <td>
              <select onChange={handleInorout} className="typeOfInput" >
                <option value="in">Income</option>
                <option value="out">Expenses</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><span><img src={CategoryImg} /></span></td>
            <td>
              <Category cate={cate} setCate={setCate} handleChooseCate={handleChooseCate} inorout={inorout} setMoneyArr={setMoneyArr} moneyArr={moneyArr} />
            </td>
          </tr>
          <tr>
            <td><span><img src={AmountImg} /></span></td>
            <td> <input type="text" onChange={(e) => setInputMoney(e.target.value)} value={inputMoney} placeholder="e.g. 180" className="inputAmount"></input></td>
          </tr>
          <tr>
            <td><span><img src={DateImg} /></span></td>
            <td>Default Today</td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}><button type="button" onClick={handleIAdd} className="AddCatBtnStyle">Enter</button></td>
          </tr>
        </tbody>
      </table>
      <img src={AddImg} className="addItemCircle" onClick={displayTable} style={{display:disT2}}/>
      <img src={CollapseImg} className="addItemCircle" onClick={displayTable} style={{display:disT}}></img>

    </div>
  )
}