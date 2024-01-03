import React from 'react';
import {
  Chart,
  Tooltip,
  Interval,
} from "bizcharts";

const HomeBar = () => {


  const barData = [
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

  return (
      <div style={{width: '100%', marginLeft: -30,marginTop:10}}>
        <Chart height={260} padding={[20, 20, 50, 80]} data={barData} autoFit>
          <Interval
              adjust={[
                {
                  type: 'dodge',
                  marginRatio: 0,
                },
              ]}
              color="city"
              position="month*sales"
          />
          <Tooltip shared />
        </Chart>
      </div>
  );
};

export default HomeBar;