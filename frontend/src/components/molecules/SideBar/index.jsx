import React from 'react';
import { Sidebar } from 'rsuite';
import { FaDocker, FaDatabase, FaThList } from 'react-icons/fa';
import VerticalMenu from '../../atoms/VerticalMenu';

import './styles.less';

const SidebarMenu = () => {
  const menuItems = [
    {
      text: 'Containers',
      icon: <FaDocker />,
      onClick: () => {},
    },
    {
      text: 'Compose',
      icon: <FaThList />,
      onClick: () => {},
    },
    {
      text: 'Volumes',
      icon: <FaDatabase />,
      onClick: () => {},
    },
  ];

  return (
    <Sidebar>
      <VerticalMenu items={menuItems} />
    </Sidebar>
  );
};

export default SidebarMenu;
