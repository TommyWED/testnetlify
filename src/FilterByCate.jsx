import {useState,useEffect} from 'react'
import CategorySelect from './CategorySelect'
import FilterByTime from './FilterByTime'
//filter function
export default function FilterByCate({Arr, cate,ioo,setArr}) {
  // console.log({Arr, cate});
  let initcate = ioo == "in" ? "Salary" : "Foods"
  const [filterCate, setFilterCate] = useState(initcate)
  const [newArr,setNewArr] = useState()
  
  function handleFilter(e) {
    setFilterCate(n=> e.target.value)
    console.log(e.target.value)
  }
  function logtest() {
    console.log(filterCate)
  }

  return(
    <>
      <select onChange={handleFilter} className="selectByCatScrollDownCat">
        {cate.filter((el)=>el.ioo == ioo).map((el)=><option key={el.cate} value={el.cate} >{el.cate}</option>)}
      </select>
      <FilterByTime Arr={Arr ?? []} cate={cate} ioo={ioo} filterCate={filterCate} setArr={setArr}/>
    </>
  )
}