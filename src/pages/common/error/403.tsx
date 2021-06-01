/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 16:36:31
 * @Description: 
 * @FilePath: /vite-react/src/pages/common/error/403.tsx
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import { Button, Result } from 'antd';
import React from 'react';

const NoAuthPage: React.FC<any> = (props) => (
  <Result
    status="403"
    title="403"
    subTitle="对不起，权限不够"
    extra={
      <Button type="primary" onClick={() => props.history.push('/login')}>
        去登录
      </Button>
    }
  />
);

export default NoAuthPage;
