import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWt_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly:"true", // this is to prevent cross site scripting attacks by preventing access to the cookie from javascript code
    secure: process.env.NODE_ENV !== "development", // this is to ensure that the cookie is only sent over https in production
    maxAge: 30 * 24 * 60 * 60 * 1000, // this is to set the cookie to expire in 30 days
    sameSite: "strict" // this is to ensure that the cookie is sent only in a first party context and not in a third party context i.e it is not sent to another website when the user clicks on a link in the website that contains the cookie
  })

  return token;
};

export default generateToken;
