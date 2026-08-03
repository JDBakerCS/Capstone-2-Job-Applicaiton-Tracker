const { jwtVerify, createRemoteJWKSet } = require("jose");

const issuer = `https://${process.env.AUTH0_DOMAIN}/`;
const audience = process.env.AUTH0_AUDIENCE;
const jwks = createRemoteJWKSet(new URL(`${issuer}.well-known/jwks.json`));

async function checkJwt(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing bearer token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload, protectedHeader } = await jwtVerify(token, jwks, {
      issuer,
      audience,
    });

    req.auth = {
      payload,
      header: protectedHeader,
      token,
    };

    next();
  } catch (error) {
    console.error("JWT VERIFY ERROR:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = checkJwt;