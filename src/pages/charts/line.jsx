import React, {useState} from 'react';
import {Button, Card, message} from "antd";
import ReactEcharts from 'echarts-for-react'

// 后台管理的折线图路由组件
const Line = () => {

  const [sales, setSales] = useState([5, 20, 36, 10, 10, 20])

  const [stores, setStores] = useState([15, 30, 46, 20, 20, 40])

  const [xAxisData,setXAxisData]=useState(["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"])

  // 更新数据
  const update = () => {
    // 更新库存
    setStores(prevState => {
      const updatedStores = prevState.reduce((pre, store) => {
        pre.push(store - 1)
        return pre
      }, [])
      if (updatedStores.some(store => store < 0)) {
        // 查询库存为0的下标
        const zeroIndex = updatedStores.findIndex(item=>item===-1)
        message.error(`【${xAxisData[zeroIndex]}】库存为0`)
        return prevState  // 当库存为0时,保持值不变,不更新状态
      } else {
        // 更新销售
        setSales(prevState => prevState.map(sale => sale + 1))
        return updatedStores
      }
    })
  }

  const getOptions = (sales, stores) => {
    return {
      title: {
        text: 'ECharts 折线图'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data:xAxisData
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'line',
        data: sales
      }, {
        name: '库存',
        type: 'line',
        data: stores
      }]
    }
  }

  return (
      <div>
        <Card>
          <Button type={'primary'} onClick={update}>更新</Button>
        </Card>
        <Card title='折线图'>
          <ReactEcharts option={getOptions(sales, stores)}/>
        </Card>
      </div>
  );
};

export default Line;