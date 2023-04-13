import React from 'react';
import { YAxis, XAxis, LineChart, CartesianGrid, Line, Tooltip, Text } from 'recharts';

const XAxisTick = ({ x, y, payload }) => {
    return (
        <Text x={x} y={y} width={10} fontSize={10} textAnchor="end" verticalAnchor="start" angle={-50} fill={"#c7c7c7"}>
            {payload.value}
        </Text>
    );
};

const YAxisTick = ({ x, y, payload }) => {
    return (
        <Text x={x} y={y} width={10} fontSize={14} textAnchor="end" fill={"#c7c7c7"}>
            {payload.value}
        </Text>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p><b>Time: </b>{`${label}`}</p>
                <p><b>Temperature: </b>{`${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

function Chart({ data }) {
    return (
        <LineChart data={data} width={500} height={180}>
            <CartesianGrid stroke="#262626" strokeWidth={0.5} />
            <Line type="monotone" dataKey="temp_c" dot={{ r: 2 }} isAnimationActive={false} stroke="#ccc" strokeWidth={2.5} strokeOpacity={0.75} />
            <XAxis dataKey="time" interval={0} tick={<XAxisTick />} strokeOpacity={0} />
            <YAxis domain={[dataMin => Math.floor(dataMin), dataMax => Math.ceil(dataMax)]} tick={<YAxisTick />} strokeOpacity={0} />
            <Tooltip content={CustomTooltip} />
        </LineChart>
    );
}

export default Chart;