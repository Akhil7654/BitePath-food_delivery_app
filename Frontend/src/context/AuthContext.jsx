import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios.get('http://localhost:8000/api/auth/user/')
                .then(response => setUser(response.data))
                .catch(() => setUser(null));
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:8000/api/auth/login/', { username: email, password });
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
    };
    
    const register = async (username, email, password) => {
        const response = await axios.post('http://localhost:8000/api/auth/register/', { username, email, password });
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
