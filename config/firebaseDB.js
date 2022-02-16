const dotenv = require("dotenv");
const admin = require("firebase-admin");
dotenv.config();

const firebase = () => {
  const serviceAccount = require("../project-keeper-547bc-ac7fd5db6238.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL_FIREBASE,
  });
};

module.exports = firebase;
