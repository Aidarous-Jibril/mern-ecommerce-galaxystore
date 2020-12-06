import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const requireAuth = asyncHandler(async (req, res, next) => {
  //   const token = req.cookies.jwt;

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log("ERROR", err.message);
          res.status(401).redirect("/login");
          throw new Error("Not authorized, token failed");
        } else {
          //set req.user to the user which has same id as decodedToken.id
          req.user = await User.findById(decodedToken.id);
          // console.log(req.user);
          next();
        }
      });
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, No token found");
  }
});

// middleware access for admin
const requireAdminAccess = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { requireAuth, requireAdminAccess };
