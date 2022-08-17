import env from "./env.js";
import jsonwebtoken from "jsonwebtoken";

export default function jwtService() {
  const jwtSecretKey = env.tokenKey;

  const createToken = (user) => {
    let data = {
      ownerId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      time: Date(),
    };
    let expire = {
      expiresIn: "2h",
    };

    return jsonwebtoken.sign(data, jwtSecretKey, expire);
  };

  const validateToken = (idToken) => {
    let token;
    try {
      token = jsonwebtoken.verify(idToken, jwtSecretKey);
    } catch (err) {
      return { error: "invalid token" };
    }

    return { token: token };
  };

  return {
    createToken,
    validateToken,
  };
}
