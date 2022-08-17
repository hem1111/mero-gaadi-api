import jwtService from "../utils/jwt.js";

export default function authHandler() {
  const handle = (req, res, next) => {
    let idToken;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      idToken = req.headers.authorization.split(" ")[1];
    }

    if (!idToken) {
      const error = new Error("id token is empty");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwtService().validateToken(idToken);
    if (decoded.error) {
      const error = new Error(decoded.error);
      error.statusCode = 401;
      return next(error);
    }

    req.context = {
      ownerId: decoded.token.ownerId,
    };

    next();
  };

  return {
    handle,
  };
}
