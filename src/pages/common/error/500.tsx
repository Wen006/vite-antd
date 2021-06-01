/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 16:36:31
 * @Description: 
 * @FilePath: /vite-react/src/pages/common/error/500.tsx
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import { Button, Result } from 'antd';
import React from 'react';

const ErrorPage: React.FC<any> = (props) => (
  <Result
    status="500"
    title="500"
    subTitle="不好意思，出错了"
    extra={
      <Button type="primary" onClick={() => props.history.push('/home')}>
       返回首页
      </Button>
    }
  />
);

export default ErrorPage;
