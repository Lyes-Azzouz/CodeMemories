require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 3000;

// Configuration de CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173/Mes_codes"],
  })
);

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import de Firebase Admin SDK
const admin = require("firebase-admin");

// Initialisation de Firebase Admin SDK
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// Configuration de multer pour le stockage des fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucket = admin.storage().bucket();

// Route pour afficher une page d'accueil
app.get("/", (req, res) => {
  res.send("salut");
});

// Route pour récupérer les données de Firebase
app.get("/api/data", async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection("card").get();
    const data = snapshot.docs.map((doc) => doc.data());
    console.log("Données récupérées de Firebase:", data);
    res.json(data);
  } catch (error) {
    console.error("Erreur de récupération des données ", error);
    res.status(500).json({ error: "Erreur de récupération des données" });
  }
});

// Route pour envoyer des données à Firebase
app.post("/api/data", upload.single("imageFile"), async (req, res) => {
  console.log("Données reçues du client:", req.body);
  try {
    const { title, technos } = req.body;

    let technosArray;
    try {
      technosArray =
        typeof technos === "string" ? JSON.parse(technos) : technos;
    } catch (err) {
      throw new Error(
        "Le champ 'technos' doit être un tableau ou une chaîne JSON valide"
      );
    }

    if (!Array.isArray(technosArray)) {
      throw new Error("Le champ 'technos' doit être un tableau");
    }

    let imageUrl = null;
    if (req.file) {
      const encodedFileName = encodeURIComponent(req.file.originalname);
      const blob = bucket.file(`${Date.now()}_${encodedFileName}`);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobStream.on("error", (err) => {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Erreur lors du téléchargement de l'image" });
      });

      blobStream.on("finish", async () => {
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const newCard = {
          title,
          technos: technosArray,
          imageUrl, // Assurez-vous que l'URL de l'image est définie ici
        };
        const db = admin.firestore();
        await db.collection("card").add(newCard);
        console.log("Données envoyées à Firebase:", newCard);
        res.status(201).send("Donnée envoyée !");
      });

      blobStream.end(req.file.buffer);
    } else {
      const newCard = {
        title,
        technos: technosArray,
        imageUrl, // Assurez-vous que l'URL de l'image est définie ici, même si elle est null
      };
      const db = admin.firestore();
      await db.collection("card").add(newCard);
      console.log("Données envoyées à Firebase sans image:", newCard);
      res.status(201).send("Donnée envoyée !");
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des données: ", error.message);
    res
      .status(500)
      .json({ error: "Erreur lors de l'envoi des données: " + error.message });
  }
});

// Écoute du serveur
app.listen(port, () => {
  console.log(`Ecoute sur : http://localhost:${port}`);
});
