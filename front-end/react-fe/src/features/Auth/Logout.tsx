import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Logout() {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => {
                auth.signOut().then(() => {
                    navigate('/');
                }, console.error);
            }}>Logout</button>
        </>
    )
}