import React from 'react';
import "antd/dist/antd.min.css";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import UserDetailPage from './pages/UserDetailPage';
import LayoutCustom from './Component/Layout/LayoutCustom';


function App() {
  return (
    <LayoutCustom>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserDetailPage />} />
      </Routes>
    </LayoutCustom>
  );
}

export default App;
