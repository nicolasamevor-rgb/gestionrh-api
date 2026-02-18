const { where } = require("sequelize");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const { Personne, User, Conge, Poste, Service } = require("../models/index");

exports.createEmploye = async (req, res) => {
  try {
    const nouvelEmploye = await Personne.create({
      ...req.body,
      competences: {},
    });
    res.status(201).json(nouvelEmploye);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAllEmploye = async (req, res) => {
  try {
    const employes = await Personne.findAll({
      include: [
        {
          model: User,
          as: "compte",
          attributes: ["role", "email"],
        },
        {
          model: Conge,
          as: "sesConges",
        },
        {
          model: Poste,
          as: "posteActuel",
          include: [
            {
              model: Service,
              as: "ServiceRattachement",
              attributes: ["id"],
            },
          ],
        },
      ],
      where: { "$compte.role$": "employe" },
    });
    res.json(employes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getEmployeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const employe = await Personne.findOne({
        where: {
          id: id,
          role: "EMPLOYE",
        },
      });
      res.json(employe);
    }
  } catch (error) {
    console.error("Erreur SQL:", error); // Utile pour le debug en console
    res.status(500).json({
      success: false,
      message: "Une erreur interne est survenue.",
      error: error.message,
    });
  }
};

exports.updateEmploye = async (req, res) => {
  const { id } = req.params;
  const {
    compte,
    sesConges,
    createdAt,
    updatedAt,
    id: bodyId, // On ignore aussi l'ID s'il est dans le body
    ...dataToUpdate
  } = req.body;
  try {
    const [updated] = await Personne.update(dataToUpdate, {
      where: { id: id },
    });
    if (updated) {
      const updatedEmploye = await Personne.findByPk(id, {
        include: [
          { model: Conge, as: "sesConges" },
          { model: User, as: "compte" },
        ],
      });
      return res.status(201).json(updatedEmploye);
    }
    throw new Error("Employé non trouvé");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.createficheEmploye = async (req, res) => {
  try {
    const { id } = req.params;
    // 1. Récupération des données avec ses relations
    const employe = await Personne.findByPk(id, {
      include: [
        { model: Conge, as: "sesConges" },
        { model: User, as: "compte" },
      ],
    });

    if (!employe) return res.status(404).send("Employé non trouvé");

    // 2. Lecture et Compilation du template
    const templatePath = path.join(__dirname, "../templates/ficheEmploye.html");
    const source = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(source);

    // 3. Préparation des données pour Handlebars
    const data = {
      nom: employe.nom,
      prenoms: employe.prenoms,
      email: employe.compte.email,
      telephone: employe.telephone,
      poste: employe.poste,
      departement: employe.departement,
      dateGeneration: new Date().toLocaleDateString("fr-FR"),
      historique: employe.sesConges
        ? employe.sesConges.map((conge) => {
            // On utilise .get({plain:true}) pour être sûr d'avoir un objet pur
            const c = conge.get({ plain: true });
            return {
              typeConge: c.typeConge,
              // Formatage français indispensable pour le PDF
              dateDebut: new Date(c.dateDebut).toLocaleDateString("fr-FR"),
              dateFin: new Date(c.dateFin).toLocaleDateString("fr-FR"),
              status: c.status, // Vérifie que c'est bien 'statut' et non 'status'
            };
          })
        : [],
    };

    const htmlContent = template(data);

    // 4. Puppeteer transforme le HTML en PDF
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // 5. Envoi du fichier
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de la génération du PDF");
  }
};
