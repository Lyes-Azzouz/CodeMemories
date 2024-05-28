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

// Module firebase pour les opérations d'authentification
const firebase = require("firebase/app");
require("firebase/auth");

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

// Configuration de multer pour le stockage des fichiers en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const bucket = admin.storage().bucket(); // Initialisation du bucket de stockage Firebase

// Import de la logique de sécurité via Jwt
const verifyToken = require("./jwt/verifyToken");

// Route pour inscrire un nouvel utilisateur
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    res.status(201).json({ message: "Inscription réussie", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour la connexion des utilisateurs
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = await user.user.getIdToken();
    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour la déconnexion des utilisateurs
app.post("/logout", async (req, res) => {
  try {
    await firebase.auth().signOut();
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour afficher une page d'accueil
app.get("/", (req, res) => {
  res.send("salut");
});

// Route pour envoyer des données à Firebase
// Route pour envoyer des données à Firebase
app.post(
  "/api/data",
  verifyToken,
  upload.single("imageFile"),
  async (req, res) => {
    console.log("Données reçues du client:", req.body);
    try {
      const { title, technos, textAreas } = Object.assign({}, req.body);
      const userId = req.user ? req.user.uid : null;

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

      // Vérification et parsing du champ textAreas
      let textAreasArray;
      try {
        textAreasArray =
          typeof textAreas === "string" ? JSON.parse(textAreas) : textAreas;
      } catch (err) {
        throw new Error(
          "Le champ 'textAreas' doit être un tableau ou une chaîne JSON valide"
        );
      }

      if (!Array.isArray(textAreasArray)) {
        throw new Error("Le champ 'textAreas' doit être un tableau");
      }

      let imageUrl = null;
      if (req.file) {
        const blob = bucket.file(Date.now() + "-" + req.file.originalname);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });

        blobStream.on("error", (err) => {
          console.error("Erreur lors de l'upload de l'image:", err);
          res.status(500).json({ error: "Erreur lors de l'upload de l'image" });
        });

        blobStream.on("finish", async () => {
          imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

          // Créer la nouvelle carte avec l'ID de l'utilisateur
          const newCard = {
            title,
            technos: technosArray,
            textAreas: textAreasArray,
            imageUrl,
            userId, // Associer la carte à l'ID de l'utilisateur
          };

          // Enregistrer la nouvelle carte dans Firestore
          await admin.firestore().collection("card").add(newCard);

          res.status(201).send("Donnée envoyée !");
        });

        blobStream.end(req.file.buffer);
      } else {
        // Créer la nouvelle carte avec l'ID de l'utilisateur
        const newCard = {
          title,
          technos: technosArray,
          textAreas: textAreasArray,
          imageUrl,
          userId, // Associer la carte à l'ID de l'utilisateur
        };

        // Enregistrer la nouvelle carte dans Firestore
        await admin.firestore().collection("card").add(newCard);

        res.status(201).send("Donnée envoyée !");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données: ", error.message);
      res.status(500).json({
        error: "Erreur lors de l'envoi des données: " + error.message,
      });
    }
  }
);

// Route pour récupérer les données de Firebase associées à l'utilisateur
app.get("/api/data", verifyToken, async (req, res) => {
  const userId = req.user ? req.user.uid : null;

  try {
    // Récupérer les données associées à l'utilisateur depuis Firestore
    const snapshot = await admin
      .firestore()
      .collection("card")
      .where("userId", "==", userId)
      .get();
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    res.json(data);
  } catch (error) {
    console.error("Erreur de récupération des données: ", error);
    res.status(500).json({ error: "Erreur de récupération des données" });
  }
});

// Route pour supprimer une carte par ID (en vérifiant si elle appartient à l'utilisateur)
app.delete("/api/data/:id", verifyToken, async (req, res) => {
  const userId = req.user ? req.user.uid : null; // Récupérer l'ID de l'utilisateur à partir de Firebase Authentication
  const { id } = req.params;

  try {
    // Vérifier si la carte appartient à l'utilisateur
    const cardRef = admin.firestore().collection("card").doc(id);
    const card = await cardRef.get();
    if (!card.exists) {
      return res.status(404).send("Carte non trouvée");
    }
    if (card.data().userId !== userId) {
      return res
        .status(403)
        .send("Vous n'êtes pas autorisé à supprimer cette carte");
    }

    // Supprimer la carte de Firestore
    await cardRef.delete();

    res.status(200).send("Donnée supprimée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression des données: ", error);
    res.status(500).json({
      error: "Erreur lors de la suppression des données: " + error.message,
    });
  }
});

// Écoute du serveur sur le port défini
app.listen(port, () => {
  console.log(`Ecoute sur : http://localhost:${port}`);
});
