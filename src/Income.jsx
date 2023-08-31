import { useState, useContext } from "react"
import FilterByTime from './FilterByTime'
import FilterByCate from './FilterByCate'
import { ContextC} from './ContextC'
// import PieC from './PieC'
//import FilterByCate from './FilterByCate'


//home page component

export default function Income() {

  let initArr = JSON.parse(localStorage.getItem("MoneyArr"))
  const [Arr, setArr] = useState(initArr || [] )
  const [timeOrCate, setTimeOrCate] = useState("time")
  function handleTOC(e) {
    setTimeOrCate(el => e.target.value)
  }
  
  const {  cate} = useContext(ContextC)
  
  
  return (
    <>
      <select onChange={handleTOC} className="selectByCatScrollDown">
        <option value="time" key="time">Time</option>
        <option value="category" key="category">Category</option>
      </select>
      {timeOrCate === "time" ? <FilterByTime ioo="in" filterCate={""} setArr={setArr}/> : <FilterByCate Arr={Arr} cate={cate} ioo="in" setArr={setArr}/>}
    </>
  )
}