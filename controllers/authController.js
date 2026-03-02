const { User, Personne, sequelize } = require("../models");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // Début de la transaction
  const t = await sequelize.transaction();

  try {
    const { email, password, nom, prenoms, role } = req.body;

    // 1. Création de la Personne (Identité)
    const nouvellePersonne = await Personne.create(
      {
        nom,
        prenoms,
      },
      { transaction: t },
    );

    // 2. Hashage du mot de passe
    const hashedPassword = await argon2.hash(password);

    // 3. Création de l'Utilisateur (Compte) lié à la personne
    await User.create(
      {
        email,
        password: hashedPassword,
        role: role || "employe",
        personneId: nouvellePersonne.id, // On utilise l'ID tout juste généré
      },
      { transaction: t },
    );

    // Si tout est OK, on valide
    await t.commit();
    res.status(201).json({ message: "Utilisateur et Profil créés !" });
  } catch (error) {
    // Si une erreur survient, on annule tout
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Chercher l'utilisateur par son email
    const user = await User.findOne({
      where: { email },
      include: [{ model: Personne, as: "employe" }],
    });

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 2. Vérifier le mot de passe avec Argon2
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 3. Créer le Token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "ma_cle_secrete_ultra_secure",
      { expiresIn: "24h" },
    );

    // 4. Envoyer le token dans un cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true, // Interdit au JavaScript de lire le cookie (Anti-XSS)
      secure: false, // Mettre à 'true' en production (HTTPS)
      sameSite: "Lax", // Protection contre CSRF
      maxAge: 24 * 60 * 60 * 1000, // 24 heures
    });

    res.json({
      message: "Connexion réussie",
      user: {
        nom: user.employe?.nom,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    // req.user est rempli par ton middleware de protection
    const user = await User.findByPk(req.user.userId, {
      include: [
        {
          model: Personne,
          as: "employe",
          attributes: ["id", "nom", "prenoms"],
        },
      ],
    });

    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({
      user: {
        id: user.employe?.id,
        nom: user.employe?.nom,
        prenoms: user.employe?.prenoms,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
