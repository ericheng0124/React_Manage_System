 /*
*   包含应用中所有接口请求函数的模块
* */

import ajax from "./ajax"
// import product from "../pages/product/product"

const BASE_URL = ''

// 登陆
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', {username, password}, 'POST')

// 查询天气  使用高德地图api 调用天气模块api
export const reqWeather = (city) => ajax(`https://restapi.amap.com/v3/weather/weatherInfo?key=673739883cf30ea04246906079d92557&city=${city}`)


// 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(BASE_URL + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(BASE_URL + '/manage/category/add', {
  parentId,
  categoryName
}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE_URL + '/manage/category/update', {
  categoryId,
  categoryName
}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE_URL + '/manage/category/info', {categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', {pageNum, pageSize})

/*
搜索商品分页列表(根据商品名称,根据商品描述)
searchType:搜索的类型,productName/productDesc
*/
export const reqSearchProducts = ({
                                    pageNum,
                                    pageSize,
                                    searchName,
                                    searchType
                                  }) => ajax(BASE_URL + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})

// 搜索商品分页列表(根据商品描述)
// export const reqSearchProducts2=({pageNum, pageSize, searchName})=>ajax(BASE_URL+'/manage/product/search',{
//   pageNum,
//   pageSize,
//   productDesc:searchName
// })

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE_URL + '/manage/img/delete', {name}, 'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE_URL + `/manage/product/${product._id?'update':'add'}`, product, 'POST')

// 修改商品
// export const reqUpdateProduct = (product)=>ajax(BASE_URL+'/manage/product/update',product,'POST')

// 更新商品状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE_URL + '/manage/product/updateStatus', {
  productId,
  status
}, 'POST')

// 获取所有角色的列表
export const reqRoles = ()=>ajax(BASE_URL+'/manage/role/list')

// 添加角色
export const reqAddRole = (roleName)=>ajax(BASE_URL+'/manage/role/add',{roleName},'POST')

// 更新角色
export const reqUpdateRole = (role)=>ajax(BASE_URL+'/manage/role/update',role,'POST')

// 获取所有用户列表
export const reqUsers = ()=>ajax(BASE_URL+'/manage/user/list' )

// 删除指定用户
export const reqDeleteUser = (userId)=>ajax(BASE_URL+'/manage/user/delete',{userId},'POST')

 // 添加/更新 用户
 export const reqAddOrUpdateUser = (userData) => ajax(BASE_URL + '/manage/user/'+(userData._id?'update':'add'), userData, 'POST')