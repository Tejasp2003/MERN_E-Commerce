import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly:"true", // this is to prevent cross site scripting attacks by preventing access to the cookie from javascript code
    secure: process.env.NODE_ENV !== "development", // this is to ensure that the cookie is only sent over https in production
    maxAge: 30 * 24 * 60 * 60 * 1000, // this is to set the cookie to expire in 30 days
    sameSite: "None", // this is to ensure that the cookie is sent on cross origin requests


    
  })

  return token;
};

export default generateToken;
