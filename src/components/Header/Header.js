import React, { useState } from 'react';

import { Menu } from 'antd';
const items = [
  {
    label: 'Search',
    key: 'search',
  },
  {
    label: 'Rated',
    key: 'rated',
  }
]
const HeaderMenu = () => {
  const [current, setCurrent] = useState('search');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{
    display: 'flex',
    justifyContent: 'center',
  }} />;
};

export default HeaderMenu