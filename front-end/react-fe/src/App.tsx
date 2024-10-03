import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './shared/comps/Layout';
import PostsList from './features/Posts/PostsList';
import AuthProvider from './features/Auth/AuthProvider';
import Login from './features/Auth/Login';
import Logout from './features/Auth/Logout';
import PostEdit from './features/Posts/PostEdit';
import PostCreate from './features/Posts/PostCreate';

const App: React.FC<any> = () => {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/:id" element={<PostEdit />} />
          <Route path="posts/new" element={<PostCreate />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </AuthProvider>


  );
}

export default App;
