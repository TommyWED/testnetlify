import { useState,useEffect, useContext } from "react"
import FilterByTime from './FilterByTime'
import FilterByCate from './FilterByCate'
import { ContextC} from './ContextC'
// import PieC from './PieC'
//import FilterByCate from './FilterByCate'


//home page component

export default function Income() {
  let ioo = "in"
  const [timeFilter, setTimeFilter] = useState("all");

  let initArr = JSON.parse(localStorage.getItem("MoneyArr"))
  const [Arr, setArr] = useState(initArr || [] )
  const [timeOrCate, setTimeOrCate] = useState("time")
  function handleTOC(e) {
    setTimeOrCate(el => e.target.value)
  }
  
  const { moneyArr, setMoneyArr, cate, setCate, nextId ,setNextId } = useContext(ContextC)

  // function handleFilter(e) {
  //   const filterValue = e.target.value;
  //   setTimeFilter(filterValue);
  //   if (ioo == "in") {
  //     if (filterValue === "all") {
  //       setArr(JSON.parse(localStorage.getItem("MoneyArr")));
  //     } else {
  //       const filteredArr = JSON.parse(localStorage.getItem("MoneyArr")).filter(
  //         (item) => item.time === filterValue
  //       );
  //       setArr(filteredArr);
  //     }
  //   } else {
  //     if (filterValue === "all") {
  //       // setArr(Arr.filter((item) => item.category !== filterCate));
  //     } else {
  //       const filteredArr = Arr.filter(
  //         (item) =>
  //           item.time === timeFilter && item.category === filterValue
  //       );
  //       setArr(filteredArr);
  //     }
  //   }
  // }
  
  
  return (
    <>
      <select onChange={handleTOC} className="selectByCatScrollDown">
        <option value="time" key="time">Time</option>
        <option value="category" key="category">Category</option>
      </select>
      {timeOrCate == "time" ? <FilterByTime ioo="in" filterCate={""} setArr={setArr}/> : <FilterByCate Arr={Arr} cate={cate} ioo="in" setArr={setArr}/>}
    </>
  )
}