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


const Header = () => {
  const user = memoryUtils.user

  const [currTime, setCurrTime] = useState(formateDate(Date.now()))

  const [weather, setWeather] = useState('')

  const [temperature,setTemperature]=useState('0')

  const [city, setCity] = useState('')

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
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.label
        }
      }
    })
    return title
  }

  // 获取时间日期
  const getTime = () => {
    setInterval(() => {
      setCurrTime(formateDate(Date.now()))
    }, 1000)
  }

  // 获取天气
  const getWeather = async () => {
    try {
      const res = await reqWeather('武汉')
      setWeather(res.lives[0].weather)
      setCity(res.lives[0].city)
      setTemperature(res.lives[0].temperature)
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
    getTime()
    getWeather()
  }, [])

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
            <span>{temperature}℃</span>

          </div>
        </div>
        <Modal
            title='确认是否要退出当前登录账户!'
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
          <p style={{paddingTop:'10px'}}>如果确认退出请点击【确认】,取消请点击【取消】 </p>
        </Modal>
      </div>
  );
};

export default Header;