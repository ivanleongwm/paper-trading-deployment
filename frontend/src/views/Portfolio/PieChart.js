import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data01 = [
	{name: 'Group A', value: 400, fill: '#8884d8',}, 
	{name: 'Group B', value: 300, fill: '#9cacf1',},
 	{name: 'Group C', value: 300, fill: '#8dd1e1'}, 
  {name: 'Group D', value: 200, fill: '#82ca9d'},
  {name: 'Group E', value: 278, fill: '#a4de6c'}, 
  {name: 'Group F', value: 189, fill: '#d0ed57'},
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];

export default function App({pieChartData}) {
  console.log("Pie Chart Data",pieChartData)
    return (
      <PieChart width={600} height={600}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill="#8884d8"
            label
          />
          <Tooltip />
      </PieChart>
    );
}
