import { useState,useEffect } from "react";
import "./App.css";
import LeftArrow from './img/Left_Arrow_icon.png'
import RightArrow from './img/Right_Arrow_icon.png'

export default function Homedetails({ moneyArr, cate }) {
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
  const [selectEl, setSelectEl] = useState();
  let dayArr = [];
  for (let i = 1; i < 32; i++) {
    dayArr.push(i);
  }

  function handleLeft() {
    if (index > 0) {
      setIndex((n) => n - 1);
    } else if (index === 0) {
      setIndex(11);
      setYears(n=> n - 1);
    }
  }
  function handleRight() {
    if (index < 11) {
      setIndex((n) => n + 1);
    } else if (index === 11) {
      setIndex(0);
      setYears(n=> n + 1);
      
    }
  }

  let moneyArr2 =
    moneyArr.filter((el) => new Date(el.time).getMonth() === index) !== []
      ? moneyArr.filter((el) => new Date(el.time).getMonth() === index).filter((el) => new Date(el.time).getFullYear() === years)
      : [];

      useEffect(() => {
        const filteredData = moneyArr.filter((el) => new Date(el.time).getMonth() === index);        
      }, [moneyArr, index]);
  //console.log(dayArr.filter((el)=> moneyArr.some(n=> new Date(n.time).getDate() == el)))
  return (
    <div>
      <div className="monthPwithArrow">
          <img src={LeftArrow} className="leftBtn" onClick={handleLeft}/>
        <p className="monthP"> {month[index]} {years}</p>
          <img src={RightArrow} className="rightBtn" onClick={handleRight} />
      </div>

      <div className="HomeBottomContainer" style={{ paddingTop: "20px" }}>
        <div className={moneyArr.length !== 0 ? "homedetailsdiv" : null}>
          {/* don't change to other month ,need to fix bug */}
          
          {moneyArr2 !== []
            && dayArr
              .filter((el) =>
                moneyArr2.some((n) => new Date(n.time).getDate() === el)
              )
              .map((date) => (
                <div onClick={(e) => setSelectEl((n) => date)} >
                  <div className="homePageEntryRow">
                    <div className="homePageEntryRecordLeft">
                    {
                      day[
                      new Date(
                        moneyArr2.filter(
                          (el) => new Date(el.time).getDate() === date
                        )[0].time
                      ).getDay()
                      ]
                    }
                     ,{" "} {date}/{index + 1} : </div>
                    <div className="homePageEntryRecordRight">${moneyArr2
                      .filter((fd) => new Date(fd.time).getDate() === date)
                      .filter((el) => el.inoroutC === "in")
                      .reduce((a, c) => a + +c.money, 0) -
                      moneyArr2
                        .filter((fd) => new Date(fd.time).getDate() === date)
                        .filter((el) => el.inoroutC === "out")
                        .reduce((a, c) => a + +c.money, 0)}</div>
                  </div>
                  {selectEl === date && (
                    <div className="breakDownList">
                      {cate
                        .filter((cf) =>
                          moneyArr2
                            .filter(
                              (el) => new Date(el.time).getDate() === date
                            )
                            .some((el) => el.category === cf.cate)
                        )
                        .map((el) => (
                          <p className="showBreakDown">
                            {el.cate} : {el.ioo === "in" ? "+$" : "-$"}
                            {moneyArr2
                              .filter(
                                (el) => new Date(el.time).getDate() === date
                              )
                              .filter((el2) => el2.category === el.cate)
                              .reduce((a, c) => a + c.money, 0)}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              ))
            }
        </div>
      </div>
    </div>
  );
}


