import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [isloggedIn, setIsLoggedIn] = useState(user!=null);
    const login = async (data) => {
        const res = await axios.post('https://blogit-backend-tmf9.onrender.com/api/users/login', data,{withCredentials:true});
        if(res.status===200){
            console.log(res.data);
            Cookies.set('access_token', res.data.token, { expires: 7, path: '/' });
            setIsLoggedIn(true);
            setUser(res.data.user);
        }
    }

    const logout = async() => {
        // const res = await axios.post('https://blogit-backend-tmf9.onrender.com/api/users/logout');
        Cookies.remove('access_token');
        setIsLoggedIn(false);
        setUser(null);
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user,isloggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
