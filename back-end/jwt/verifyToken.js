// Import de firebase-admin
const admin = require("firebase-admin");

/**
 * Middleware de vérification du token
 * Vérifie si le token d'authentification est fourni dans l'en-tête de la requête.
 * Si le token est valide, décode et ajoute les informations de l'utilisateur à la requête.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @param {Function} next - La fonction middleware suivante.
 */
const verifyToken = async (req, res, next) => {
  // Récupère le token d'authentification de l'en-tête de la requête
  const authHeader = req.headers.authorization;

  // Vérifie si le token est fourni et s'il commence par "Bearer "
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extrait le token de l'en-tête
    const idToken = authHeader.split(" ")[1];

    try {
      // Vérifie et décode le token à l'aide de Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      // Ajoute les informations de l'utilisateur décodées à la requête
      req.user = decodedToken;
      // Passe à la fonction middleware suivante
      next();
    } catch (error) {
      // Gère les erreurs de vérification du token
      console.error("Erreur de vérification du token:", error);
      // Envoie une réponse avec un statut 403 (interdit) en cas d'erreur de vérification
      res.status(403).json({ error: "Token invalide" });
    }
  } else {
    // Envoie une réponse avec un statut 401 (non autorisé) si aucun token n'est fourni
    res.status(401).json({ error: "Token non fourni" });
  }
};

// Exporte la fonction middleware de vérification du token
module.exports = verifyToken;
