import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import AppCard from '../../shared/comps/AppCard';
import { Box, Button, CardActions, CardContent, Typography } from '@mui/material';

export default function Logout() {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <AppCard>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Logout

                </Typography>
                <Typography variant="body2">
                    Are you sure to logout?

                </Typography>
            </CardContent>
            <CardActions sx={{

                justifyContent: "flex-end",
                // alignItems: "flex-end",

            }}>
                <Button onClick={() => {
                    navigate('/');
                }}>Return to home</Button>
                <Button variant="contained" onClick={() => {
                    auth.signOut().then(() => {
                        navigate('/');
                    }, console.error);
                }}>Confirm</Button>
            </CardActions>

        </AppCard>
    )
}