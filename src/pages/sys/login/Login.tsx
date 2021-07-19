/*
 * @Author: Jackstraw
 * @Date: 2021-05-28 11:25:05
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Select, notification, message, Menu, Dropdown, Row, DatePicker } from 'antd';
import { callRpc } from '@/services/service.handler';
import { Languages } from '@/core/app.types';
import { setSessionUser } from '@/utils/web.util';
import { box } from '@/componets/notice';
import { BgCL } from '@/componets/animation';
import { GlobalOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { keys } from 'lodash';
import { getMessage, I18n } from '@/core/i18n';
import { setStoreItem } from '@/core/cache/db';
import lodash from 'lodash'
import './index.less'
import { FormInstance, useForm } from 'antd/lib/form/Form';
import { getStoreItem } from '../../../core/cache/db';

const layout = {
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 14, span: 10 },
};

const Login: React.FC<any> = (props: any) => {

  const [submitting, setSubmitState] = useState<boolean>(false);
 
  const form = React.useRef<FormInstance>()

  const storeUInfo = (v) =>{
    setStoreItem("login.user",v);
  }

  const storeUInfoUp = () =>{
    console.log(`form`, form)
    const v = getStoreItem("login.user")
    if(v){
      form.current?.setFieldsValue({
        ...v,
        remember:true,
      })
    }else{
      form.current?.setFieldsValue({
        username:"",
        password:"",
        remember:false,
      })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      storeUInfoUp();
    }, 500);
    return () => {
      
    }
  }, [])

  const onFinish = (values: any) => {
    setSubmitState(true)
    callRpc({
      key: "sys.user.login",
      params: values,
    }).then((data: any) => {
      setSubmitState(false)

      if (data.success) {
        setSessionUser(values);
        if(values.remember){
          storeUInfo(values);
        }

        setTimeout(() => {
          props.history.push('/home')
        }, 1000);
      } else {
        setSessionUser("")
        box.error(data.msg)
      }

    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = ({ key }: { key: Languages }) => {
    props.app.setLang(key)
  }

  const showLang: { [key: string]: string } = {
    "zh_CN": "中文",
    "ja_JP": "日本語",
    "en_US": "English",
  }

  const menu = (
    <Menu onClick={handleChange} selectedKeys={[props.app.language]}>
      {
        keys(Languages).map((it: string) => {
          return <Menu.Item key={it}> {showLang[it] || it} </Menu.Item>
        })
      }
    </Menu>
  );



  return (
    <div className="login-main">
      <BgCL>
        <div className="language-panel">
          <div className="language-select">
            <Dropdown mouseLeaveDelay={1} overlay={menu} placement="bottomLeft" arrow>
              <GlobalOutlined />
            </Dropdown>
          </div>
        </div>
        <Form
          {...layout}
          ref={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: getMessage({ id: 'login.enter.username' }) }]}
          >
            <Input prefix={<UserOutlined />} size="large" placeholder={getMessage({ id: 'login.enter.username' })} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: getMessage({ id: "login.enter.passwd" }) }]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" placeholder={getMessage({ id: "login.enter.passwd" })} />
          </Form.Item>
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox><I18n id="login.remember"></I18n></Checkbox>
          </Form.Item>
          <Form.Item>
            <Button shape="round" type="primary" htmlType="submit" size="middle" className="login-btn" loading={submitting} >
              <I18n id="login.btn" />
            </Button>
          </Form.Item>
        </Form>
      </BgCL>
    </div>
  );
};

export default Login;