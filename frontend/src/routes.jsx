import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './enums/routes';

import Containers from './pages/Containers';
import CreateContainer from './pages/CreateContainer';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.INDEX} element={<Containers />} />
      <Route path={routes.CREATE_CONTAINER} element={<CreateContainer />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
