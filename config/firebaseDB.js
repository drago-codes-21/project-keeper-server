const dotenv = require("dotenv");
// const { initializeApp } = require('firebase-admin/app');
// const firebase = require('firebase-admin/app');
const admin = require("firebase-admin");


dotenv.config();

const firebase = () => {
    const serviceAccount = require("../project-keeper-547bc-ac7fd5db6238.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://project-keeper-547bc-default-rtdb.firebaseio.com"
    });

    // const firebaseConfig = {
    //     apiKey: "AIzaSyB1WMWFzGFazOvrG4yQC2BA8ithWI_Dymo",
    //     authDomain: "project-keeper-547bc.firebaseapp.com",
    //     projectId: "project-keeper-547bc",
    //     storageBucket: "project-keeper-547bc.appspot.com",
    //     messagingSenderId: "1021146308414",
    //     appId: "1:1021146308414:web:5cd318ce5b22e87e00166f"
    // };

    // initializeApp(firebaseConfig);

}


module.exports = firebase;