require("dotenv").config(); // Charger les variables d'environnement depuis le fichier .env

const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 3000;

// Configuration de CORS pour permettre les requêtes de certains domaines
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173/Mes_codes"],
  })
);

// Middleware pour parser les requêtes JSON et URL-encodées
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import du SDK Firebase Admin
const admin = require("firebase-admin");

// Initialisation de Firebase Admin avec les informations d'identification
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// Configuration de multer pour le stockage des fichiers en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucket = admin.storage().bucket(); // Initialisation du bucket de stockage Firebase

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
    const { id, title, technos } = req.body;

    // Vérification et parsing du champ technos
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
          id, // Ajouter l'ID ici
          title,
          technos: technosArray,
          imageUrl, // Définir l'URL de l'image ici
        };
        const db = admin.firestore();
        await db.collection("card").doc(id).set(newCard); // Utiliser set() pour définir l'ID
        console.log("Données envoyées à Firebase:", newCard);
        res.status(201).send("Donnée envoyée !");
      });

      blobStream.end(req.file.buffer);
    } else {
      const newCard = {
        id, // Ajouter l'ID ici
        title,
        technos: technosArray,
        imageUrl, // Définir l'URL de l'image ici, même si elle est null
      };
      const db = admin.firestore();
      await db.collection("card").doc(id).set(newCard); // Utiliser set() pour définir l'ID
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

// Route pour supprimer une carte par ID
app.delete("/api/data/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = admin.firestore();
    const cardRef = db.collection("card").doc(id);
    await cardRef.delete();
    console.log("Document supprimé avec succès:", id);
    res.status(200).send("Donnée supprimée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression des données: ", error.message);
    res.status(500).json({
      error: "Erreur lors de la suppression des données: " + error.message,
    });
  }
});

// Écoute du serveur sur le port défini
app.listen(port, () => {
  console.log(`Ecoute sur : http://localhost:${port}`);
});
