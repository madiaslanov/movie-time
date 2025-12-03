import React, {useState} from 'react';
import styles from './profile.module.css';
import {useAuthStore} from "../../store/auth-store.ts";
import {uploadAndSetProfilePicture} from '../../services/userService.ts';

const imageCompressionWorker = new Worker(
    new URL('../../workers/image-compressor.js', import.meta.url)
);

const Profile = () => {
    const {user} = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !user) return;

        setIsLoading(true);
        setError('');

        imageCompressionWorker.postMessage(file);

        imageCompressionWorker.onmessage = async (event) => {
            const {compressedFile} = event.data;

            try {
                await uploadAndSetProfilePicture(compressedFile, user);
            } catch (err) {
                console.error(err);
                setError('Не удалось загрузить изображение. Попробуйте снова.');
            } finally {
                setIsLoading(false);
            }
        };
    };

    return (
        <div className={styles.profileContainer}>
            <h1>Profile Page</h1>
            <div className={styles.profileCard}>
                <img
                    src={user?.photoURL || '/profile-icon.svg'}
                    alt="Profile"
                    className={styles.profileImage}
                />
                <h2>{user?.email}</h2>
                <div className={styles.uploadSection}>
                    <label htmlFor="picture-upload" className={isLoading ? styles.disabledLabel : ''}>
                        {isLoading ? 'Загрузка...' : 'Сменить фото профиля'}
                    </label>
                    <input
                        id="picture-upload"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handlePictureUpload}
                        disabled={isLoading}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default Profile;