import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = (result)=>
{    
    return [
  {
    name: "Người dùng",
    Trong_tháng: result.numUserMonth,
    Tổng: result.numUser,
  },
  {
    name: "Bài viết",
    Trong_tháng: result.numPostMonth,
    Tổng: result.numPost,
  },
  {
    name: "Lượng tương tác",
    Trong_tháng: result.numCommentMonth,
    Tổng: result.numComment,
  },
]};

export default function SimpleBarChart({dataChart}) {
  return (
    <BarChart
      width={900}
      height={500}
      data={data(dataChart)}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Trong_tháng" fill="#8884d8" />
      <Bar dataKey="Tổng" fill="#82ca9d" />

    </BarChart>
  );
}