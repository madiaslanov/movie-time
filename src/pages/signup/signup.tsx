import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../login/auth.module.css';
import {signUpUser} from '../../services/authService';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validatePassword = (pass: string) => {
        const hasNumber = /\d/.test(pass);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        return pass.length >= 8 && hasNumber && hasSpecialChar;
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setError('Пароли не совпадают.');
            return;
        }
        if (!validatePassword(password)) {
            setError('Пароль должен быть не менее 8 символов, содержать одно число и один специальный символ.');
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            await signUpUser({email, password});
            navigate('/login');
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Этот email уже используется.');
            } else {
                setError('Произошла ошибка при регистрации.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleSignup}>
                <h2>Sign Up</h2>
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
                <input
                    type="password"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Регистрация...' : 'Sign Up'}
                </button>
                <p>
                    Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
                </p>
            </form>
        </div>
    );
};

export default Signup;