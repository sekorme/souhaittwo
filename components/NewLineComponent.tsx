// components/LineChartComponent.tsx
'use client';

import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 14000 },
    { name: 'Apr', value: 17000 },
    { name: 'May', value: 19000 },
    { name: 'Jun', value: 22000 },
    { name: 'Jul', value: 21000 },
    { name: 'Aug', value: 23000 },
    { name: 'Sep', value: 25000 },
    { name: 'Oct', value: 26000 },
];

export default function LineChartComponent() {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#ccc" />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
