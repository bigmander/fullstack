import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC<any> = () => (
    <>
        <Header>
        </Header>

        <Outlet />
    </>
)
export default Layout;