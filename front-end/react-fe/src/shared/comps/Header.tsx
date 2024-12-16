import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography } from '@mui/material';
import ActionsMenu from './ActionsMenu';
import { useAuth } from '../../features/Auth/AuthProvider';

const Header: React.FC<any> = () => {
    const navigate = useNavigate();
    const auth = useAuth()

    const actionsList = useMemo(() => auth.userInfo === null ? [{
        action: () => {
            navigate('/login')
        },
        label: 'Login'
    }, {
        action: () => {
            navigate('/signup')
        },
        label: 'Sign-up'
    }] : [{
        action: () => {
            navigate('/posts/new')
        },
        label: 'Create a Post'
    }, {
        action: () => {
            navigate('/logout')
        },
        label: 'Logout'
    }], [auth.userInfo])

    return (
        <AppBar sx={{
            // backgroundColor: 'white',
            color: 'blue'
        }} position="sticky" elevation={0} variant='outlined'>
            <Toolbar>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    <Link style={{
                        color: 'white',
                        textDecoration: 'none'
                    }} to="/">Full-stack workshop</Link>

                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    <ActionsMenu
                        actionsStyle={{
                            color: 'white'
                        }}
                        actionsList={
                            actionsList
                        }
                    />
                </Box>
            </Toolbar>
        </AppBar >
    )
};
export default Header;