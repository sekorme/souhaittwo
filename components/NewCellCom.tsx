'use client'


import {Cell} from "recharts";
import React from "react";

const COLORS = ["#3b82f6", "#0f172a"];
const NewCellCom =(props: { index: any }) => {
    return <Cell fill={COLORS[props.index % COLORS.length]}/>;
}

export default NewCellCom