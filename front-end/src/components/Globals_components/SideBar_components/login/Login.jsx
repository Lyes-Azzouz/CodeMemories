// Hooks
import React, { useState, useEffect } from "react";
// Style
import "./login__style.scss";
// React Icons
import { CiLogin, CiLogout } from "react-icons/ci";
// Router-dom
import { Link } from "react-router-dom";
// Libs
import { auth } from "../../../../../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

/**
 * Composant Login
 * Gère l'état de connexion de l'utilisateur et fournit des boutons de connexion et de déconnexion.
 * @returns {JSX.Element} Le composant Login.
 */
export function Login() {
  // État local pour indiquer si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effet pour écouter les changements d'état d'authentification de l'utilisateur
  useEffect(() => {
    // Fonction de rappel pour la mise à jour de l'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Met à jour l'état en fonction de la présence d'un utilisateur
    });

    // Retourne la fonction de désabonnement pour nettoyer les écouteurs lors du démontage du composant
    return () => unsubscribe();
  }, []);

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = async () => {
    try {
      await signOut(auth); // Déconnexion de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error); // Affiche une erreur en cas d'échec de déconnexion
    }
  };

  // Rendu conditionnel en fonction de l'état de connexion de l'utilisateur
  return (
    <div className="login-container">
      {/* Bouton de déconnexion si l'utilisateur est connecté */}
      {isLoggedIn ? (
        <span className="login-icon-deconnecte" onClick={handleLogout}>
          <CiLogout />
          <span className="login-text-deconnecte">Déconnexion</span>
        </span>
      ) : (
        // Bouton de redirection vers la page de connexion si l'utilisateur n'est pas connecté
        <Link to="Login">
          <span className="login-icon">
            <CiLogin />
          </span>
          <span className="login-text">Connexion</span>
        </Link>
      )}
    </div>
  );
}
