import React, {useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {message, Modal, Upload} from 'antd';
import {reqDeleteImg} from "../../api";
import {BASE_IMG_URL} from "../../utils/constants";


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

// 使用forwardRef()包装组件传入props,ref  注意这里的ref就是父组件创建赋值的ref
const PicturesWall = React.forwardRef((props, ref) => {

  const [messageApi, contextHolder] = message.useMessage()
  const [previewOpen, setPreviewOpen] = useState(false)  // 标识是否显示大图预览modal
  const [previewImage, setPreviewImage] = useState('')   // 大图的url地址
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])


  /*
  * 获取所有已上传图片文件名的数组
  * */
  const getImgs = () => {
    return fileList.map(file => file.name)
  }


  const handleCancel = () => setPreviewOpen(false);  // 隐藏大图预览modal
  const handlePreview = async (file) => {
    // 显示指定file对应的大图
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  /*
  * file:当前操作的图片文件(上传/删除)
  * fileList:所有已上传图片的数组
  * */
  const handleChange = async ({file, fileList}) => {
    console.log('handleChange()', file.status, fileList.length, file === fileList[fileList.length - 1])
    // 一旦上传成功,将上传的file的信息修正(name,url)
    if (file.status === 'done') {  // 上传完成
      const result = file.response  // {status:0, data:{name:'xxx', url:'图片地址'}}
      if (result.status === 0) {  // 上传成功
        messageApi.open({
          type: 'success',
          content: '上传图片成功!',
        });
        const {name, url} = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {  // 上传失败
        messageApi.open({
          type: 'error',
          content: '上传图片失败!',
        });
      }
    } else if (file.status === 'removed') {  // 删除图片
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        messageApi.open({
          type: 'success',
          content: '删除图片成功!'
        })
      } else {
        messageApi.open({
          type: 'error',
          content: '删除图片失败!'
        })
      }
    }
    // 在操作(上传/删除)过程中更新fileList状态
    setFileList(fileList)
  };

  const uploadButton = (
      <div>
        <PlusOutlined/>
        <div
            style={{
              marginTop: 8,
            }}
        >
          上传图片
        </div>
      </div>
  );

  // 将需要传递给父组件的方法通过useImperativeHandle方法将需要传递的子组件方法放入其中
  React.useImperativeHandle(ref, () => ({
    getImgs,
  }))

  // componentsWillMount
  useEffect(() => {
    setFileList((props.imgs && props.imgs.length > 0) ? props.imgs.map((img, index) => ({
      uid: -index,
      name: img,
      status: 'done',
      url: BASE_IMG_URL + img
    })) : [])
  }, [props.imgs])

  return (
      <div ref={ref}>
        {contextHolder}
        <Upload
            action="/manage/img/upload"   // 上传图片的地址
            accept='image/*'  // 只接收图片格式的文件
            listType="picture-card"  // 上传完后的图片样式效果
            name='image'  // 请求参数名
            fileList={fileList}  // 所有已上传图片文件对象的数组
            onPreview={handlePreview}  // 显示指定file对应的大图
            onChange={handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
          />
        </Modal>
      </div>
  )
})

export default PicturesWall

/*
标签对象就是组件对象
* 1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件,子组件就可以调用
* 2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象),调用其方法
* */

