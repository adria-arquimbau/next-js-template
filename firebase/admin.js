
const admin = require("firebase-admin")

const serviceAccount = require("./template-next-js-firebase-adminsdk-yyx5g-5cab6bb3a8.json")

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://devter-6661a.firebaseio.com",
    })
} catch (e) {}

export const firestore = admin.firestore()