import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register user
export const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password, // لا تستخدم تشفير كلمة المرور
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // قم بتخزين كلمة المرور كما هي
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "user does not exist" });
    }

    if (user.password !== password) {
      return res.status(400).json({ msg: "invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; // قم بإزالة كلمة المرور من كائن المستخدم قبل الرد
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
