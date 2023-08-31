
// Category List
export default function CategorySelect({cate,handleChooseCate}) {
  return (
    <>
    <select onChange={handleChooseCate}>
      {cate.map((el) =><option key={el.cate} value={el.cate}>{el.cate}</option>)}
    </select> 
    </>
  )
}