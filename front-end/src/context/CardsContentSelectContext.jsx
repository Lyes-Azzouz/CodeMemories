// Hooks
import { createContext, useState } from "react";

/**
 * Créer un context qui permet de passer des props afin d'afficher les valeurs de chaque cards dans une autre page (CardContentDetail)
 * Lorsque l'on se trouve sur la page "detail" (Composant parent : CardContentDetail) , les données (titre , image etc..) sont passées et s'affichent.
 */

export const CardsContentSelectContext = createContext();

export const CardsContentProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <CardsContentSelectContext.Provider
      value={{ selectedCard, setSelectedCard }}
    >
      {children}
    </CardsContentSelectContext.Provider>
  );
};
