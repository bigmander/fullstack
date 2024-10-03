import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/Auth/AuthProvider';

const Header: React.FC<any> = () => {
    const auth = useAuth();
    return (
        <header>
            <h1>This is a header</h1>

            <nav>
                <em>{JSON.stringify(auth.userInfo)}</em>
                <ul>
                    <li>
                        <Link to="/posts">Posts List</Link>
                    </li>
                    {auth.userInfo !== null ?
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li> :
                        <li>
                            <Link to="/login">Login</Link>
                        </li>}
                </ul>
            </nav>
        </header>
    )
};
export default Header;