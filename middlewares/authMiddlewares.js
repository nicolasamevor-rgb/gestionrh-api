const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // 1. Récupérer le token depuis les cookies (grâce à cookie-parser)
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès refusé. Aucun jeton fourni." });
  }

  try {
    // 2. Vérifier la validité du JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "ma_cle_secrete_ultra_secure"
    );

    // 3. Ajouter les infos de l'utilisateur à l'objet 'req'
    // Cela permet aux contrôleurs suivants d'accéder à req.user.userId
    req.user = decoded;

    next(); // On passe au contrôleur suivant (getMe)
  } catch (error) {
    res.status(401).json({ message: "Session expirée ou jeton invalide." });
  }
};
