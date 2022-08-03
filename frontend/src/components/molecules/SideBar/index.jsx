import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'rsuite';
import { FaDocker, FaDatabase, FaThList } from 'react-icons/fa';
import { routes } from '../../../enums/routes';
import VerticalMenu from '../../atoms/VerticalMenu';

import './styles.less';

const SidebarMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: 'Containers',
      icon: <FaDocker />,
      onClick: () => navigate(routes.INDEX),
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
