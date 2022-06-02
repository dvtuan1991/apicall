import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import UserDetailPage from './pages/UserDetailPage';
import LayoutCustom from './component/Layout/LayoutCustom';
import CreateUser from './pages/CreateUser';
import Posts from './pages/Posts';
import DetailPost from './modules/Posts/DetailPost/DetailPost';
import CreatePost from './pages/CreatePost';
import Page404 from './pages/Page404';
import "antd/dist/antd.min.css";
import './App.css';


function App() {
  return (
    <LayoutCustom>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/users/create' element={<CreateUser /> } />
        <Route path='/posts/create' element={<CreatePost />} />
        <Route path='/users/:id' element={<UserDetailPage /> } />
        <Route path='/posts/:id' element={<DetailPost />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </LayoutCustom>
  );
}

export default App;
