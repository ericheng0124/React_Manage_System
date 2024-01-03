import React from 'react';
import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';

const HomeLine = () => {
// 数据源


// 数据源
  const lineData = [
    {
      month: "Jan",
      city: "武汉",
      sales: 7
    },
    {
      month: "Jan",
      city: "北京",
      sales: 3.9
    },
    {
      month: "Feb",
      city: "武汉",
      sales: 16.9
    },
    {
      month: "Feb",
      city: "北京",
      sales: 14.2
    },
    {
      month: "Mar",
      city: "武汉",
      sales: 19.5
    },
    {
      month: "Mar",
      city: "北京",
      sales: 15.7
    },
    {
      month: "Apr",
      city: "武汉",
      sales: 14.5
    },
    {
      month: "Apr",
      city: "北京",
      sales: 8.5
    },
    {
      month: "May",
      city: "武汉",
      sales: 18.4
    },
    {
      month: "May",
      city: "北京",
      sales: 11.9
    },
    {
      month: "Jun",
      city: "武汉",
      sales: 21.5
    },
    {
      month: "Jun",
      city: "北京",
      sales: 15.2
    },
    {
      month: "Jul",
      city: "武汉",
      sales: 25.2
    },
    {
      month: "Jul",
      city: "北京",
      sales: 17
    },
    {
      month: "Aug",
      city: "武汉",
      sales: 26.5
    },
    {
      month: "Aug",
      city: "北京",
      sales: 16.6
    },
    {
      month: "Sep",
      city: "武汉",
      sales: 23.3
    },
    {
      month: "Sep",
      city: "北京",
      sales: 14.2
    },
    {
      month: "Oct",
      city: "武汉",
      sales: 18.3
    },
    {
      month: "Oct",
      city: "北京",
      sales: 10.3
    },
    {
      month: "Nov",
      city: "武汉",
      sales: 13.9
    },
    {
      month: "Nov",
      city: "北京",
      sales: 6.6
    },
    {
      month: "Dec",
      city: "武汉",
      sales: 9.6
    },
    {
      month: "Dec",
      city: "北京",
      sales: 4.8
    }
  ];

  const scale = {
    sales: { min: 0 },
    city: {
      formatter: v => {
        return {
          北京: '北京',
          武汉: '武汉'
        }[v]
      }
    }
  }

  return (
      <div style={{float: 'right', width: 750, height: 300,marginTop:10}}>
        <Chart scale={scale} padding={[50, 70, 60, 40]} autoFit height={320} data={lineData} interactions={['element-active']}>
          <Point position="month*sales" color="city" shape='circle' />
          <Line shape="smooth" position="month*sales" color="city" label="sales" />
          <Tooltip shared showCrosshairs region={null} g2-tooltip-list-item={{display:'flex'}}/>
          <Legend background={{
            padding:[5,100,5,36],
            style: {
              fill: '#eaeaea',
              stroke: '#fff'
            }
          }} />
        </Chart>
      </div>
  );
};

export default HomeLine;