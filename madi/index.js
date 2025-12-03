const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.uploadProfileImage = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Вы должны быть авторизованы.");
    }

    const userId = context.auth.uid;
    const imageBase64 = data.imageBase64;
    const contentType = data.contentType || "image/jpeg";

    if (!imageBase64) {
        throw new functions.https.HttpsError("invalid-argument", "Отсутствует строка изображения.");
    }

    const bucket = admin.storage().bucket();
    const filePath = `profile_pictures/${userId}`;
    const file = bucket.file(filePath);
    const buffer = Buffer.from(imageBase64, "base64");

    await file.save(buffer, { metadata: { contentType } });

    const [downloadURL] = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
    });

    try {
        await admin.auth().updateUser(userId, { photoURL: downloadURL });
        await admin.firestore().doc(`users/${userId}`).update({
            profilePictureUrl: downloadURL,
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных пользователя:", error);
        throw new functions.https.HttpsError("internal", "Не удалось обновить профиль.");
    }

    return { success: true, url: downloadURL };
});