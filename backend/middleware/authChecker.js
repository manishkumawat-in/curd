import jwt from "jsonwebtoken";

export const authChecker = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized... 1",
    });
  }

  const isVerified = jwt.verify(token, process.env.JWT_SECRET);

  if (!isVerified) {
    return res.json({
      success: false,
      message: "Unauthorized...",
    });
  }

  req.userId = isVerified.id;
  req.role = isVerified.role;
  next();
};
