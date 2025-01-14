const user = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //check if header has a token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  try {
    const verifed = jwt.verify(toke, jwtSecret);

    req.user =  await User.findById(verifed.id).select("-password")

    next()

  } catch (error) {
    res.status(401).json({ errors: ["Token inválido"] });
  }
};

module.exports = authGuard;
