import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../login/auth.module.css';

const Signup = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (pass: string) => {
        const hasNumber = /\d/.test(pass);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        return pass.length >= 8 && hasNumber && hasSpecialChar;
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError('Пароли не совпадают.');
            return;
        }
        if (!validatePassword(password)) {
            setError('Пароль должен быть не менее 8 символов, содержать одно число и один специальный символ.');
            return;
        }
        setError('');

        console.log('Регистрация прошла успешно (макет)');
        navigate('/login');
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleSignup}>
                <h2>Sign Up</h2>
                <input type="email" placeholder="Email" required />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">Sign Up</button>
                <p>
                    Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
                </p>
            </form>
        </div>
    );
};

export default Signup;