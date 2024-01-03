import React, {useEffect, useState} from 'react';
import styles from "./Header.module.css"
import {message, Modal} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {formateDate} from "../../utils/dateUtils";
import {reqWeather} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import items from "../../config/nodeList";
import localStore from "../../utils/storageUtils";
import LinkButton from "../LinkButton/LinkButton";
import {useSelector} from "react-redux";


const Header = () => {
  // const user = memoryUtils.user
  // 使用redux获取用户信息
  const user = useSelector(state => state.user)
  // console.log(user,headTitle)

  const [currTime, setCurrTime] = useState(formateDate(Date.now()))

  const [weather, setWeather] = useState('')

  const [sales, setsales] = useState('0')

  const [city, setCity] = useState('')

  const [loginIP, setLoginIP] = useState('')

  const [open, setOpen] = useState(false)

  const location = useLocation()

  const nav = useNavigate()


  // 获取title
  const getTitle = () => {
    const path = location.pathname
    let title
    items.forEach(item => {
      if (item.key === path) {
        title = item.label
      } else if (item.children) {
        // const cItem = item.children.find(cItem => cItem.key === path.pathname)
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        if (cItem) {
          title = cItem.label
        }
      }
    })
    return title
  }


  // 获取用户登录的ip地址
  const getLoginIp = async () => {
    try {
      const response = await fetch('https://api64.ipify.org?format=json')
      if (!response.ok) {
        throw new Error('请求错误!')
      }
      const data = await response.json()
      setLoginIP(data.ip)
    } catch (error) {
      console.log('Error fetching IP address:', error)
    }
  }

  // 获取ip对应的城市
  const getAddress = async (loginIP) => {
    try {
      const response = await fetch(`http://ip-api.com/json/${loginIP}?lang=zh-CN`)
      if (!response.ok) {
        throw new Error('请求出错')
      }
      const data = await response.json()
      setCity(data.city)
    } catch (error) {
      console.log(error)
    }
  }


  // 获取时间日期
  const getTime = () => {
    setInterval(() => {
      setCurrTime(formateDate(Date.now()))
    }, 1000)
  }

  // 获取天气
  const getWeather = async (city) => {
    try {
      if(city.length!==0){
        const res = await reqWeather(city)
        setWeather(res.lives[0].weather)
        // setCity(res.lives[0].city)
        setsales(res.lives[0].sales)
      }
    } catch (err) {
      message.error('获取天气失败!')
    }
  }

  // 退出登录的方法
  const logOut = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setOpen(false)
    memoryUtils.user = {}
    localStore.removeUser(user._id)
    nav('/login')
  }

  const handleCancel = () => {
    setOpen(false)
  }


  useEffect(() => {
    getLoginIp()
    getAddress(loginIP)
    getTime()
    getWeather(city)
    // console.log(city)
  }, [city,loginIP])

  return (
      <div className={styles.headerStyle}>
        <div className={styles.headerTop}>
          <span>欢迎, {user.username}</span>
          {/*<a href="/#" onClick={logOut}>退出</a>*/}
          <LinkButton onClick={logOut}>退出</LinkButton>
        </div>
        <div className={styles.headerBottom}>
          <div className={styles.headerBottomLeft}>
            <span>{getTitle()}</span>
          </div>
          <div className={styles.headerBottomRight}>
            <span>{currTime}</span>
            <span>{city}</span>
            <span>{weather}</span>
            <span>{sales}℃</span>

          </div>
        </div>
        <Modal
            title='确认是否要退出当前登录账户!'
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
          <p style={{paddingTop: '10px'}}>如果确认退出请点击【确认】,取消请点击【取消】 </p>
        </Modal>
      </div>
  );
};

export default Header;