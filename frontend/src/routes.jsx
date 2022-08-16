import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './enums/routes';

import Containers from './pages/Containers';
import CreateContainer from './pages/CreateContainer';
import Volumes from './pages/Volumes';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.INDEX} element={<Containers />} />
      <Route path={routes.CREATE_CONTAINER} element={<CreateContainer />} />
      <Route path={routes.VOLUMES} element={<Volumes />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
