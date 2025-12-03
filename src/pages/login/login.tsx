import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import { loginUser } from '../../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError('');
            await loginUser({ email, password });
            navigate('/profile');
        } catch (err: any) {
            setError('Неверный email или пароль.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Вход...' : 'Log In'}
                </button>
                <p>
                    Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
                </p>
            </form>
        </div>
    );
};

export default Login;