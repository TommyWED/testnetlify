import { useState, useEffect } from 'react'
// Add Category && display cate select(can display)
export default function Category({ cate, setCate, handleChooseCate, inorout , setMoneyArr, moneyArr}) {
  const [show, setShow] = useState("none")
  const [showD, setShowD] = useState("none")
  const [newCate, setNewCate] = useState("")
  const [deCateName, setDeCateName] = useState("")
  const [ioo, setIoo] = useState("in")
  function handleSetCate(e) {
    setNewCate(e.target.value)
  }

  function handleDisplay() {
    setShow("block")
  }

  function handleDisplayD() {
    setShowD("block")
  }

  function handleNone() {
    setShow("none")
    setShowD("none")
  }

  function handleIoo(e) {
    setIoo(e.target.value)
  }
  function handleAddCate(e) {
    e.preventDefault()
    setCate([
      ...cate,
      { "cate": newCate, "ioo": ioo }
    ])
    setNewCate("")
  }

  function handleDeleteCate() {
    setCate(cate => cate.filter((el) => el.cate != deCateName))
  }
  useEffect(()=>setMoneyArr(n=> moneyArr.filter((el)=> cate.some((c) => c.cate == el.category))),[cate])
  return (
    <div>
      <select onChange={handleChooseCate} className="addCatScrollDown changeWidth">
        {cate.filter((el) => el.ioo == inorout).map((el) => <option key={el.cate} value={el.cate}>{el.cate}</option>)}
      </select>
      <br />
      <button type="button" onClick={handleDisplay} className="AddCatBtnStyle">Add Category</button>
      <button type="button" className="AddCatBtnStyle" onClick={handleDisplayD}>Delete Category</button>
      <div style={{ display: show }}>
        <form onSubmit={handleAddCate}>
          <div className="AddCatDiv">
            <div className="AddCatDivRow">
              <select className="addCatScrollDown" onChange={handleIoo}>
                <option value="in">Income</option>
                <option value="out">Expenses</option>
              </select>

              <input type="text" value={newCate} onChange={handleSetCate} className="addCatInput"></input>
              <br />
            </div>
            <div className="AddCatDivRow">
              <input type="submit" value="Submit" className="AddCatBtnStyle"></input>
              <button type="button" onClick={handleNone} className="AddCatBtnStyle">Finish</button>
            </div>
          </div>
        </form>

      </div>
      <div style={{ display: showD }}>
        <div className="AddCatDiv">
          <select onChange={(e) => setDeCateName(e.target.value)} className="deleteCatScrollDown">
            {cate.map((el) => <option key={el.cate} value={el.cate}>{el.cate}</option>)}
          </select>
          <div>
            <button type="button" onClick={handleDeleteCate} className="AddCatBtnStyle">Delete</button>
            <button type="button" onClick={handleNone} className="AddCatBtnStyle">  Finish</button>
          </div>
        </div>
      </div>
    </div>
  )
}