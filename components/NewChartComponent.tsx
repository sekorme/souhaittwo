'use client'
import React from "react";
import {Pie, PieChart, ResponsiveContainer} from "recharts";


const pieData = [
    { name: "Visa", value: 65 },
    { name: "Job", value: 35 },
];
const NewChartComponent =(props: { callbackfn: (entry :any, index :any) => React.JSX.Element })=> {
    return <ResponsiveContainer width="100%" height={100}>
        <PieChart>
            <Pie data={pieData} innerRadius={30} outerRadius={40} dataKey="value">
                {pieData.map(props.callbackfn)}
            </Pie>
        </PieChart>
    </ResponsiveContainer>;
}

export default NewChartComponent