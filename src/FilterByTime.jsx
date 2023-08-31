import { useState, useEffect, useContext } from "react";
import PieC from "./PieC";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import './App.css';
import LeftArrow from './img/Left_Arrow_icon.png'
import RightArrow from './img/Right_Arrow_icon.png'
import { ContextC} from './ContextC'

export default function FilterByTime({ioo, filterCate, setArr }) {
  const { moneyArr, setMoneyArr, cate, setCate, nextId ,setNextId } = useContext(ContextC)
  const month = [
    "Jan",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [years, setYears] = useState(2023);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [index, setIndex] = useState(new Date().getMonth());
  const [id, setId] = useState();
  const [showED, setShowED] = useState("none");
  const [arrIndex, setArrIndex] = useState();
  const [chooseData, setChooseData] = useState(moneyArr[0]);
  const [cateType, setCateType] = useState(cate[0].cate);
  const [inorout, setInorout] = useState("in");
  const [time, setTime] = useState();
  const [money, setMoney] = useState(0);
  const [showF, setShowF] = useState("none");
  let moneyArr2 = [];
  
  
  filterCate == ""
    ? (moneyArr2 = moneyArr)
    : (moneyArr2 = moneyArr.filter((el) => el.category == filterCate));

  let moneyArr3 =
    moneyArr != []
      ? moneyArr2
        .filter((el) => el.inoroutC == ioo)
        .filter((el) => new Date(el.time).getMonth() == index)
      : [];

  function handleLeft() {
    console.log(years)
    if (index > 0) {
      setIndex((n) => n - 1);
    } else if (index == 0) {
      setIndex(11);
      setYears(n=> n - 1);
    }
  }
  function handleRight() {
    console.log(years)
    if (index < 11) {
      setIndex((n) => n + 1);
    } else if (index == 11) {
      setIndex(0);
      setYears(n=> n + 1);
      
    }
  }
  function handleGetId(e) {
    setId(e.target.dataset.id);
    setShowED("block");
    console.log(e.target.dataset.id);
  }

  function handleDelete() {
    setMoneyArr(moneyArr.filter((el) => el.id != id));
    setShowED("none");
    console.log(moneyArr);
    // console.log(id);
    // console.log(arrIndex);
    // console.log(chooseData);
  }

  function handleOK() {
    setShowED("none");
    setShowF("none");
  }

  function handleCCate(e) {
    setCateType((n) => e.target.value);
  }

  function handleIoo(e) {
    setInorout((n) => e.target.value);
  }

  function handleEdit() {
    setShowF("block");
  }

  function calTotal(){
    return moneyArr3.reduce((a, c) => a + c.money, 0)
  }
  
  useEffect(() => {
    localStorage.setItem("MoneyArr", JSON.stringify(moneyArr));
    setArr(n=>moneyArr);
  }, [moneyArr]);

  useEffect(() => {
    setArrIndex((n) => moneyArr.indexOf(chooseData));
  }, [chooseData]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(moneyArr);
    let newArr = moneyArr;
    newArr[arrIndex] = {
      id: id,
      money: +money,
      category: cateType,
      inoroutC: inorout,
      time: time,
    };
    setMoneyArr((n) => newArr);
    setArr((n) => newArr);
    localStorage.setItem("MoneyArr", JSON.stringify(newArr));
    setShowED("none");
  }

  function handleMoney(e) {
    setMoney((n) => +e.target.value);
  }
  
  return (
    <>
      <div className="monthPwithArrow">
        <a type="button" onClick={handleLeft}>
          <img src={LeftArrow} className="leftBtn" />
        </a>
        <p className="monthP"> {month[index]} {years}</p>
        <a type="button" onClick={handleRight}>
          <img src={RightArrow} className="rightBtn" />
        </a>
      </div>
      <div className="container">
        <div className="leftContainer">
          {calTotal() !== 0 ? (
            <PieC
              Arr={moneyArr2
                .filter((el) => el.inoroutC == ioo)
                .filter((el) => new Date(el.time).getMonth() == index)}
              cate={cate.filter((el) => el.ioo == ioo)}
            />
          ) : null}
        </div>

        <div className="rightContainer">
          <div className="incomeListofItems">
            
            <div
              style={{
                backgroundColor: "rgb(209,209,209, 0.6)",
                borderRadius: "10px",
                width: "80%",
              }}

            >
            <p className="overview">Overview</p>
              <div className="InExSummary">     
            <p>Total {ioo === "in" ? "income" : "expense"}:</p>
              <p>${calTotal()}</p>
              </div>
              <hr />
              {cate
                .filter((el) => el.ioo == ioo)
                .map((el) => (
                  
                  <div className="InExSummary">
                    
                    <p>{el.cate} :</p> 
                    <p>${""}
                    {moneyArr3
                      .filter((n) => n.category == el.cate)
                      .reduce((a, c) => a + c.money, 0)} 
                    </p>
                  </div>
                ))}
            </div>
            {moneyArr != []
              ? moneyArr2
                .filter((el) => el.inoroutC == ioo)
                .filter((el) => new Date(el.time).getMonth() == index)
                .map((el) => (
                  <div
                    key={el.id}
                    onClick={() => {
                      setId((n) => el.id);
                      setShowED("block");
                      setArrIndex((n) => moneyArr.indexOf(el));
                      setChooseData((n) => el);
                      setTime((n) => el.time);
                    }}
                    data-id={el.id}
                    className="detailsdiv"
                  >
                    <p>
                      <div style={{fontWeight:900}}>
                        {day[new Date(el.time).getDay()]}
                        <span /> {new Date(el.time).getDate()}/<span >{month[index]}</span>
                      </div>
                      <span>
                        {" "}
                        {el.inoroutC == "out" ? "-" : "+"}${el.money}
                      </span>
                    </p>
                    <p>{el.category}</p>
                  </div>
                ))
              : []}
            <div className="editordelete" style={{ display: showED }}>
              <p>Amount : ${chooseData ? chooseData.money : ""}</p>
              <p>Category : {chooseData ? chooseData.category : ""}</p>
              <Button onClick={handleEdit} variant="secondary">
                Edit
              </Button>{" "}
              <Button onClick={handleDelete} variant="danger">
                Delete
              </Button>
              <CloseButton
                onClick={handleOK}
                style={{ position: "absolute", top: "20px", right: "20px" }}
              />
              <form onSubmit={handleSubmit} style={{ display: showF }}>
                
                Type :{" "}
                <select onChange={handleIoo}>
                  <option value="in" key="in">
                    Income
                  </option>
                  <option value="out" key="out">
                    Expense
                  </option>
                </select>
                <br />
                Category :{" "}
                <select onChange={handleCCate}>
                  {cate.filter(n=>n.ioo == inorout ).map((el) => (
                    <option value={el.cate} key={el.cate}>
                      {el.cate}
                    </option>
                  ))}
                  )
                </select>
                <br />
                Amount :{" "}
                <input type="text" value={money} onChange={handleMoney}></input>
                <br />
                <Button
                  type="submit"
                  variant="secondary"
                  style={{
                    position: "relative",
                    bottom: "-10px",
                    left: "120px",
                  }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
