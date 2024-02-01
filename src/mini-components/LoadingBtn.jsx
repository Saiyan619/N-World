import React, { useState } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

const LoadingBtn = () => {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <Flex gap="small" vertical>

      <Flex gap="small" wrap="wrap">
        <Button htmlType="submit" type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Click me!
        </Button>
      </Flex>
    </Flex>
  );
};
export default LoadingBtn;