/*
 * @Author: Jackstraw
 * @Date: 2021-05-28 11:25:05
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Select, notification, message } from 'antd';
import './index.less'
import { callRpc } from '@/services/service.handler';
import { Languages } from '@/core/app.types';
import { getLang } from '@/utils/web.util';
import { setSessionUser } from '@/utils/web.util';
import { box } from '@/componets/notice';
import { setLang } from '../../../utils/web.util';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC<any> = (props: any) => {

  const [submitting, setSubmitState] = useState<boolean>(false)

  const onFinish = (values: any) => {
    setSubmitState(true)
    callRpc({
      key: "sys.user.login",
      data: values,
    }).then((data: any) => {
      if (data.success) {
        setSessionUser(values.username)

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


  return (
    <div className="login-main">
      <Select style={{ width: 120 }} onChange={handleChange}>
        {
          Object.keys(Languages).map(it => {
            return <Option key={it} value={it}>{it}</Option>
          })
        }
      </Select>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;