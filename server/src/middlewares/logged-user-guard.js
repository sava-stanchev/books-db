import tokensData from "../data/tokens.js";

export default async (req, res, next) => {
  const token = req.headers.authorization.replace("bearer ", "");
  const result = await tokensData.getToken(token);

  if (result !== token) {
    return res.status(401).json({ message: `You're not signed in!` });
  }

  await next();
};
