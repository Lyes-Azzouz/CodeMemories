// Hooks
import React, { useState, useEffect } from "react";
// Style
import "./login_page__style.scss";
// Libs
import { auth } from "../../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// Router-dom
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/Mes_codes"); // Redirige vers la page "d'accueil" si l'utilisateur est connecté
        // A voir si je change...
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");

    if (!email || !password) {
      setErrorMessage("Veuillez entrer une adresse e-mail et un mot de passe.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Connexion réussie !");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Inscription réussie !");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    setMessage("");
  };

  return (
    <div className="login-page_container">
      <h2>{isLogin ? "Se connecter" : "Créer un compte"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="champs">
          <label className="email">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="champs">
          <label className="password">
            Mot de passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="login-btns">
          <button type="submit">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
          {message && <p className="success-message">{message}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="button" onClick={toggleMode}>
            {isLogin ? "Créer un compte" : "J'ai déjà un compte"}
          </button>
        </div>
      </form>
    </div>
  );
}
