const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");
const { RapportMission } = require("../models/index");

//1- Configuration de l'authentification Google
/*const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../config/google-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/drive.file"]
})
const drive = google.drive({version : 'v3' , auth})

//2- fonction d'upload vers le drive

const uploadToDrive = async (fileObject, missionId) => {
  const BufferStream = new stream.PassThrough();
  BufferStream.end(fileObject.buffer)
  const {data} = await drive.files.create({
    media :{
      mimeType : fileObject.mimetype,
      body: BufferStream
    },
    requestBody :{
      name : `Rapport_Mission_${missionId}_${Date.now()}.pdf`,
      parents : ["1llmFHxnTZU-XdlM-crhLjIw8lXmGzf9u"] 
    },
    supportsAllDrives: true,
    ignoreDefaultVisibility: true, 
    fields: "id, webViewLink",
  })
  try {
    await drive.permissions.create({
      fileId: data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
      supportsAllDrives: true,
    });
  } catch (err) {
    console.log("Note: Impossible de changer les permissions, mais le fichier est peut-être déjà créé.");
  }
  return data
}*/

// 1. Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createRapportMission = async (req, res) => {
  try {
    const { titre, commentaire, dateRapport, missionId } = req.body;
    const file = req.file;
    console.log(
      "****************************************",
      missionId,
      "********************************************************",
    );
    if (!file) {
      return res.status(400).json({ error: "Aucun fichier téléchargé" });
    }

    // 2. Upload vers Cloudinary via un Stream
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto", // Indispensable pour les PDF
            folder: "rapports_missions", // Dossier automatique sur Cloudinary
            public_id: `Mission_${titre}_${titre.replace(/\s+/g, "_")}_${new Date().toLocaleDateString("fr-FR").replace(/\//g, "-")}`,
            format: "pdf",
          },

          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        // On envoie le buffer du fichier (venant de Multer) dans le stream
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const cloudinaryResult = await uploadToCloudinary();

    // 3. Création dans ta base de données SQL
    const newRapportMission = await RapportMission.create({
      titre: titre,
      commentaire: commentaire,
      dateRapport: dateRapport || new Date(),
      MissionId: missionId,
      fichierUrl: cloudinaryResult.secure_url, // L'URL HTTPS générée
      contenu: "",
    });

    res.status(201).json(newRapportMission);
  } catch (error) {
    console.error("ERREUR CLOUDINARY/DB :", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRapportMissions = async (req, res) => {
  try {
    const rapportMissions = await RapportMission.findAll();
    res.status(200).json(rapportMissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRapportMissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const rapportMission = await RapportMission.findByPk(id);
    if (rapportMission) {
      res.status(200).json(rapportMission);
    } else {
      res.status(404).json({ error: "Rapport de mission non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRapportMission = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await RapportMission.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedRapportMission = await RapportMission.findByPk(id);
      res.status(200).json(updatedRapportMission);
    } else {
      res.status(404).json({ error: "Rapport de mission non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRapportMission = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await RapportMission.destroy({
      where: { id },
    });
    if (deleted) {
      res
        .status(200)
        .json({ message: "Rapport de mission supprimé avec succès" });
    } else {
      res.status(404).json({ error: "Rapport de mission non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
