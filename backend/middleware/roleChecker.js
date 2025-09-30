export const roleChecker = (req, res, next) => {
  if (req.role !== "admin") {
    return res.json({
      success: false,
      message: "Unauthorized: only admin have this persmision",
    });
  }

  next();
};
