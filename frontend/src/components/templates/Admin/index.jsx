import React from 'react';
import Props from 'prop-types';
import { Container, Footer, Header } from 'rsuite';

import Logo from '../../atoms/Logo';
import MadeBy from '../../atoms/MadeBy';
import SidebarMenu from '../../molecules/SideBar';

import './styles.less';

const AdminTemplate = ({ onLogoClick, children }) => {
  return (
    <Container className="di-admin-template-container">
      <Header className="di-header">
        <Logo
          alt="docker logo"
          src="https://www.docker.com/wp-content/uploads/2022/03/Docker-Logo-White-RGB_Horizontal.png"
          onClick={onLogoClick}
        />
      </Header>

      <Container className="di-admin-content-container">
        <SidebarMenu />
        {children}
      </Container>

      <Footer className="di-footer">
        <MadeBy name="Giovanni Cavallari" href="https://www.linkedin.com/in/giovanni-cavallari/" />
      </Footer>
    </Container>
  );
};

AdminTemplate.propTypes = {
  children: Props.node.isRequired,
  onLogoClick: Props.func.isRequired,
};

export default AdminTemplate;
