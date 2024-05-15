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

// Initialisation de Firebase
const adminApp = initializeApp(firebaseConfig);

// Route pour afficher une page d'accueil
app.get("/", (req, res) => {
  res.send("salut");
});

// Route pour récupérer les données de firebase
app.get("/api/data", (req, res) => {
  res.json({ message: "donnée reçu ! wesh" });
});

// Route pour envoyer des données à Firebase
app.post("/api/data", (req, res) => {
  res.send("donnée envoyée");
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
