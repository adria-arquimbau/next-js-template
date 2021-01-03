
const admin = require("firebase-admin")

const serviceAccount = require("./template-next-js-firebase-adminsdk-yyx5g-5cab6bb3a8.json")

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
} catch (e) {}

export const firestore = admin.firestore()