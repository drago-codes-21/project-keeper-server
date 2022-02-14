const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.userToken;
  console.log("in check");

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "secret code");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/checkLogin", verifyToken, async (req, res) => {
  return res.status(200).json(req.user);
});

router.post("/loginUserWithPhoneNum", async (req, res) => {
  try {
    const db = admin.firestore();
    // console.log(req.body.user.email)
    let users = db.collection("users");

    let userData = null;

    users.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().phoneNumber === req.body.phoneNumber) {
          userData = doc.data();
          return;
        }
        // console.log(doc.id, " => ", doc.data());
      });
    });

    if (userData === null) {
      userData = {
        name: "",
        email: "",
        phoneNumber: req.body.phoneNumber,
        photo: "",
        createdAt: new Date().toLocaleDateString(),
      };
      await users.doc().set();
    }

    const token = jwt.sign(userData, "secret code", { expiresIn: "3600*48" });

    res.cookie("userToken", token, { maxAge: 900000 });

    return res.status(200).json(userData);
    // const data = await users.get();
    // console.log("firebase",data)
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/loginUserWithEmail", async (req, res) => {
  try {
    const db = admin.firestore();
    // console.log(req.body.user.email)
    let users = db.collection("users");

    let userData = "";

    await users.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let useremail = req.body.email;
        // console.log(doc.id, " => ", doc.data().email, useremail);
        if (doc.data().email === useremail) {
          userData = doc.data();
          return;
        }
      });
    });

    if (userData === "") {
      userData = await users.doc().set({
        name: req.body.displayName,
        email: req.body.email,
        phoneNumber: "",
        photo: req.body.photoURL,
        createdAt: new Date().toLocaleDateString(),
      });
    }

    const token = jwt.sign(userData, "secret code", {
      expiresIn: "3600*48",
    });

    res.cookie("userToken", token);
    console.log("token", req.cookies);

    return res.status(200).json(userData);
    // const data = await users.get();
    // console.log("firebase",data)
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(404).json("incorrect password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
