import React, { createContext, useContext, useEffect, useState } from "react"
import httpService from '../../shared/services/HttpService';
import { AxiosResponse } from "axios";
import { AuthSignInResponse } from "./AuthSignInResponse";
import { AuthSignInPayload } from "./AuthSignInPayload";
import { AuthContextHandler } from "./AuthContextHandler";
import { AuthProviderProps } from "./AuthProviderProps";
import { AuthSession } from "./AuthSession";

const AuthContext = createContext<AuthContextHandler>(null!);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({
    children
}) => {
    const [userInfo, setUserInfo] = useState<AuthSession>(null!);

    useEffect(() => {
        const rawSession = localStorage.getItem('session');
        if (rawSession !== null) {
            const session = JSON.parse(rawSession);
            console.log('session', session)
            setUserInfo(session.email)
        } else {
            setUserInfo(null!);
        }
    }, []);

    const signIn = async (credentials: AuthSignInPayload): Promise<void> => {
        const {
            data
        } = await httpService.post<AuthSignInResponse, AxiosResponse<AuthSignInResponse>, AuthSignInPayload>('/login', credentials);
        localStorage.setItem('session', JSON.stringify({
            accessToken: data.accessToken,
            email: credentials.email
        }));
        setUserInfo({
            email: credentials.email
        });
    }

    const signOut = () => {
        setUserInfo(null!);
        localStorage.removeItem('session');
        return Promise.resolve();

    };


    const value = {
        userInfo,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider >
    )
}
export default AuthProvider;