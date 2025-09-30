import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const signUp = async (req, res) => {
  let { name, mobile, password } = req.body;

  if (!name || (!mobile && !password)) {
    return res.json({ success: false, message: "All fields are required!" });
  }

  try {
    const mobileNum = parseInt(mobile);

    const isEnrolled = await prisma.account.findFirst({
      where: { mobile: mobileNum },
    });

    if (isEnrolled)
      return res.json({
        success: false,
        message: "Mobile number already registered!",
      });

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.account.create({
      data: { name: name, mobile: mobileNum, password: hashedPass },
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    newUser.password = null;
    return res.json({
      success: true,
      message: "Account Created succesfully!",
      userData: newUser,
    });
  } catch (err) {
    console.log("Signup error: ", err);
    return res.json({
      success: false,
      message: `Signup error: ${err.message}`,
    });
  }
};

export const login = async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile && !password) {
    return res.json({ success: false, message: "All fields are required!" });
  }

  try {
    const user = await prisma.account.findFirst({
      where: { mobile: parseInt(mobile) },
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Entered wrong credentials!",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    user.password = null;
    return res.json({
      success: true,
      message: "Succesfully Logged in!",
      userData: user,
    });
  } catch (err) {
    console.log("Login error:", err.message);
    return res.json({
      success: false,
      message: `Login error: ${err.message}`,
    });
  }
};

export const isLoggedIn = async (req, res) => {
  try {
    const userData = await prisma.account.findUnique({
      where: { id: req.userId },
    });

    if (!userData) {
      return res.json({
        success: false,
        message: "User Not found!",
      });
    }
    return res.json({
      success: true,
      message: "User is authenticated",
      userData,
    });
  } catch (err) {
    console.log("Login check error: ", err);
    return res.json({
      success: false,
      message: `Login check error: ${err.message}`,
    });
  }
};
