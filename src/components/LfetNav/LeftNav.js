import React, {useCallback, useEffect, useState} from 'react';
import styles from './LeftNav.module.css'
import logo from '../../assets/images/logo.png'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Menu} from 'antd';
import items, {rootSubmenuKeys} from '../../config/nodeList'
import memoryUtils from "../../utils/memoryUtils";


const LeftNav = () => {
  const navigate = useNavigate()

  const {pathname} = useLocation()

  const [openKeys, setOpenKeys] = useState([])

  const [allKeys, setAllKeys] = useState([])

  const menus = memoryUtils.user.role.menus

  // 根据登陆的user信息匹配对应的路由
  const getMenus = useCallback((items) => {
        return items.reduce((pre, item) => {
          if (item.type && menus.length > 1) {
            pre.push(item)
          } else if (item.children && menus.length > 1) {
            let res = item.children.filter(i => menus.includes(i.key))
            item.children = res
            pre.push(item)
          } else {
            if (menus.includes(item.key)) {
              pre.push(item)
            }
          }
          setAllKeys(pre)
          return pre
        }, [])
      }, [menus]
  )


  // 菜单切换时自动收缩
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    // console.log('latestOpenKey:', latestOpenKey)
    localStorage.setItem('latestOpenKey', JSON.stringify(latestOpenKey))
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
      // console.log('if_onOpenChange_openKeys:', openKeys, 'if_onOpenChange_latestOpenKey:', latestOpenKey)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      // console.log('else_onOpenChange_openKeys:',openKeys,'else_onOpenChange_latestOpenKey:',latestOpenKey)
    }
  }

  useEffect(() => {
    // 如果用户menus没有选,或者没有添加首页,就默认将'/home'首页添加到用户menus中
    if (menus.length === 0 || !menus.includes('/home')) {
      menus.push('/home')
    }
    // 当页面刷新时
    const refreshThePage = () => {
      let rank = pathname.split('/')
      // console.log('pathname:',pathname,'rank:',rank)
      //  pathname:  /products/categorys    rank: ['', 'products', 'categorys']
      // 判断是几级菜单，二级菜单rank.length为3
      if (rank.length === 3) {
        let newOpenKeys = rank.slice(0, 2).join('/') // newOpenkeys: /products
        setOpenKeys([newOpenKeys])
      }
    }
    refreshThePage()
    getMenus(items)
  }, [pathname, getMenus, menus])


  return (
      <div className={styles.leftNav}>
        <Link to={'/'} className={styles.leftNavHeader}>
          <img src={logo} alt="logo" className={styles.logoImg}/>
          <h1>React后台</h1>
        </Link>
        <Menu
            defaultSelectedKeys={'/home'}
            selectedKeys={pathname}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            mode="inline"
            theme="dark"
            items={allKeys}
            onClick={({key}) => {
              navigate(key)
            }}
        />
      </div>
  )
}

export default LeftNav