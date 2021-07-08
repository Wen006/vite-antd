/*
 * @Author: Jackstraw
 * @Date: 2021-05-28 11:25:05
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Select, notification, message, Menu, Dropdown, Row } from 'antd';
import { callRpc } from '@/services/service.handler';
import { Languages } from '@/core/app.types';
import { setSessionUser } from '@/utils/web.util';
import { box } from '@/componets/notice';
import { setLang } from '../../../utils/web.util';
import { BgCL } from '../../../componets/animation';
import { GlobalOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { keys } from 'lodash';
import './index.less'

const layout = {
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 20, span: 10 },
};

const Login: React.FC<any> = (props: any) => {

  const [submitting, setSubmitState] = useState<boolean>(false)

  const onFinish = (values: any) => {
    setSubmitState(true)
    callRpc({
      key: "sys.user.login",
      params: values,
    }).then((data: any) => {
      if (data.success) {
        setSessionUser(values)

        setTimeout(() => {
          setSubmitState(false)
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

  function handleChange(value: Languages) {
    console.log(`selected ${value}`);
    setLang(value);
  }

  const showLang: { [key: string]: string } = {
    "zh_CN": "中文",
    "ja_JP": "日本語",
    "en_US": "English",
  }


  const menu = (
    <Menu onChange={handleChange}>
      {
        keys(Languages).map((it:string) => {
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
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <GlobalOutlined />
            </Dropdown>
          </div>
        </div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} size="large" placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" placeholder="请输入密码" />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button shape="round" type="primary" htmlType="submit" size="middle" className="login-btn" loading={submitting} >
              登录
            </Button>
          </Form.Item>
        </Form>
      </BgCL>
    </div>
  );
};

export default Login;