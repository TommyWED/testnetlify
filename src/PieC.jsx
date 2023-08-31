import React from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';
    // Pie Component (don't work)
export default function PieC({Arr,cate}) {
    
  // Sample data
  const data = []
  for(let i=0;i<cate.length;i++){
    data.push({name:cate[i].cate, value:Arr.filter((el)=>el.category == cate[i].cate).reduce((a,c) => a +c.money,0)} || 0)
  }
  //cate.map((el)=>{name:el.cate,value:Arr.filter((el2)=>el2.category == el.cate).reduce((a,c)=> a +c.money,0)})
  const data2 = data
  //const data2 = data.filter((el)=> el.value != 0)
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; 
  return (
    <PieChart width={350} height={350}>
      <Pie
        data={data2}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label={(entry) => `${(entry.value / data2.reduce((acc, curr) => acc + curr.value, 0) * 100).toFixed(0)}%`}
      >
        {data2.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
}