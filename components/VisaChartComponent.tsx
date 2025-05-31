'use client'
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import React from "react";


const data = [
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 16000 },
    { name: "Mar", value: 15000 },
    { name: "Apr", value: 17000 },
    { name: "May", value: 20000 },
    { name: "Jun", value: 19000 },
    { name: "Jul", value: 22000 },
    { name: "Aug", value: 23000 },
    { name: "Oct", value: 26000 },
];
const VisaChartComponent =() => {
    return <>
        <p className="text-gray-400">Visa Applications</p>
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#ccc"/>
                <Tooltip/>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2}/>
            </LineChart>
        </ResponsiveContainer>
    </>;
}

export default VisaChartComponent