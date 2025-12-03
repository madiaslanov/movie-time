import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './auth.module.css';
import {useAuthStore} from "../../store/auth-store.ts";

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        const mockUser = {
            email: 'user@example.com',
            uid: '12345',
        };
        login(mockUser);
        navigate('/profile');
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log In</button>
                <p>
                    Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
                </p>
            </form>
        </div>
    );
};

export default Login;