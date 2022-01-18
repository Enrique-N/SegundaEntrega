let admin = require("firebase-admin");

let serviceAccount = require("./config/my-proyect-eb32f-firebase-adminsdk-ao102-4267cae9c1.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

module.exports = { db }