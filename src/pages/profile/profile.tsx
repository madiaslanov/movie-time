
import styles from './profile.module.css';
import {useAuthStore} from "../../store/auth-store.ts";

// Макет Web Worker для сжатия изображений
const imageCompressionWorker = new Worker(
    new URL('../../workers/image-compressor.js', import.meta.url)
);


const Profile = () => {
    const { user, setProfilePicture } = useAuthStore();

    const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Отправляем файл в Web Worker для "сжатия"
        imageCompressionWorker.postMessage(file);

        imageCompressionWorker.onmessage = (event) => {
            const { compressedFile } = event.data;
            console.log('Image compressed in worker:', compressedFile);

            // В реальном приложении:
            // 1. Загрузить `compressedFile` в Firebase Storage
            // 2. Получить URL для скачивания
            // 3. Сохранить URL в Firestore
            // 4. Обновить состояние с помощью setProfilePicture(downloadURL)

            // Пока что используем локальный URL для демонстрации
            const localUrl = URL.createObjectURL(compressedFile);
            setProfilePicture(localUrl);
        };
    };

    return (
        <div className={styles.profileContainer}>
            <h1>Profile Page</h1>
            <div className={styles.profileCard}>
                <img
                    src={user?.profilePicture || '/profile-icon.svg'}
                    alt="Profile"
                    className={styles.profileImage}
                />
                <h2>{user?.email}</h2>
                <div className={styles.uploadSection}>
                    <label htmlFor="picture-upload">Change Profile Picture</label>
                    <input
                        id="picture-upload"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handlePictureUpload}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;