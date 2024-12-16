import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './shared/comps/Layout';
import PostsList from './features/Posts/PostsList';
import AuthProvider from './features/Auth/AuthProvider';
import Login from './features/Auth/Login';
import Logout from './features/Auth/Logout';
import PostEdit from './features/Posts/PostEdit';
import PostCreate from './features/Posts/PostCreate';
import CommentCreate from './features/Comments/CommentCreate';
import Signup from './features/Auth/Signup';
import AuthGuard from './features/Auth/AuthGuard';

const App: React.FC<any> = () => {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={'/posts'} />} />
          <Route path='posts' element={<PostsList />} />

          <Route path="posts/:id" element={
            <AuthGuard>
              <PostEdit />
            </AuthGuard>
          } />
          <Route path="posts/new" element={
            <AuthGuard>
              <PostCreate />
            </AuthGuard>
          } />
          <Route path="posts/:id/new-comment" element={
            <AuthGuard>
              <CommentCreate />
            </AuthGuard>
          } />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </AuthProvider>


  );
}

export default App;
