import React, {useState} from 'react';
import './home.css'
import {Card, DatePicker, Statistic, Timeline} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined, ClockCircleOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from 'dayjs';
import HomeLine from "./HomeLine";
import HomeBar from "./HomeBar";


const {RangePicker} = DatePicker
const dateFormat = 'YYYY/MM/DD';


const Home = () => {

  const [isVisited, setIsVisited] = useState(true)

  return (
      <div className={'home'}>
        <Card
            className={'home-card'}
            title={'商品总量'}
            extra={<QuestionCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>}
            style={{width: 250}}
            headStyle={{color: 'rgba(0,0,0,.45)'}}
        >
          <Statistic
              value={1128163}
              suffix="个"
              style={{fontWeight: 'bolder'}}
          />
          <Statistic
              value={15}
              valueStyle={{fontSize: 15}}
              prefix={'周同比'}
              suffix={<div>%<ArrowDownOutlined style={{color: 'red', marginLeft: 10}}/></div>}
          />
          <Statistic
              value={10}
              valueStyle={{fontSize: 15}}
              prefix={'日同比'}
              suffix={<div>%<ArrowUpOutlined style={{color: '#3f8600', marginLeft: 10}}/></div>}
          />
        </Card>
        <HomeLine/>
        <Card
            className="home-content"
            title={
              <div className="home-menu">
                <span
                    className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
                    onClick={() => setIsVisited(true)}
                >
                  访问量
                </span>
                <span
                    className={isVisited ? "" : 'home-menu-active'}
                    onClick={() => setIsVisited(false)}
                >
                  销售量
                </span>
              </div>
            }
            extra={
              <RangePicker
                  defaultValue={[dayjs('2023/09/01', dateFormat), dayjs('2023/10/01', dateFormat)]}
                  format={dateFormat}
              />
            }
        >
          <Card
              className="home-table-left"
              title={isVisited ? '访问趋势' : '销售趋势'}
              bodyStyle={{padding: 0, height: 275}}
              extra={<ReloadOutlined/>}
          >
            <HomeBar/>
          </Card>
          <Card className="home-table-right" title='任务' extra={<ReloadOutlined/>}>
            <Timeline
                items={[
                  {
                    color: 'green',
                    children: '新版本迭代会'
                  },
                  {
                    color: 'green',
                    children: '完成网站设计初版'
                  },
                  {
                    color: 'red',
                    children: (
                        <>
                          <p>联调接口</p>
                          <p>功能验收</p>
                        </>
                    )
                  },
                  {
                    color: 'red',
                    children: (
                        <>
                          <p>登陆功能设计</p>
                          <p>权限验证</p>
                          <p>页面排版</p>
                        </>
                    )
                  },
                  {
                    children: '图表界面验收'
                  },
                  {
                    dot: (
                        <ClockCircleOutlined
                            style={{
                              fontSize: '16px',
                            }}
                        />
                    ),
                    children: '首页图表代码测试'
                  },
                ]}
            />
          </Card>
        </Card>
      </div>
  );
};

export default Home;