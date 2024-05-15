// Initialisation de express.js
const express = require("express");
const app = express();
const port = 3000;

// Import de Firebase
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");

// Initialisation de Firebase Admin SDK
const admin = require("firebase-admin");

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAC0tkpwWsXUV6mFyePEmgvPROIf7unLsY",
  authDomain: "dev-memories-21f38.firebaseapp.com",
  projectId: "dev-memories-21f38",
  storageBucket: "dev-memories-21f38.appspot.com",
  messagingSenderId: "682245424203",
  appId: "1:682245424203:web:d11ea8e1d79c3d3cc9b9ce",
  measurementId: "G-KNVPKVLGSB",
};

// Modele de données
const card = require("./models/card");

// Initialisation de Firebase
const adminApp = initializeApp(firebaseConfig);

// Route pour afficher une page d'accueil
app.get("/", (req, res) => {
  res.send("salut");
});

// Route pour récupérer les données de firebase
app.get("/api/data", async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection("item-collection").get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.json(data);
  } catch (error) {
    console.error("Erreur de récupération des données ", error);
    res.status(500).json({ error: "Erreur de récupération des données" });
  }
});

// Route pour envoyer des données à Firebase
app.post("/api/data", async (req, res) => {
  try {
    const { title, imageUrl, technos } = req.body;
    const newCard = new card(title, imageUrl, technos);
    const db = admin.firestore();
    await db.collection("card").add(newCard);
    res.status(201).send("Donnée envoyée");
  } catch (error) {
    console.error("Erreur lors de l'envoi des données: ", error);
    res.status(500).json({ error: "Erreur lors de l'envoi des données" });
  }
});
// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
