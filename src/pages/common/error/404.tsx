
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC<any> = (props) => (
  <Result
    status="404"
    title="404"
    subTitle="对不起，未找到资源"
    extra={
      <Button type="primary" onClick={() => props.history.push('/home')}>
        返回首页
      </Button>
    }
  />
);

export default NoFoundPage;
