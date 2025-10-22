import React from "react";
import PropTypes from "prop-types"; // Importer PropTypes pour la vérification de type des props du composant

// Composant modal pour les dialogues de confirmation
const Modal = ({ onClose, onConfirm, children }) => {
  return (
    // Arrière-plan overlay (couche semi-transparente derrière le modal)
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Conteneur du modal */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Contenu du modal */}
        <div className="mb-4">{children}</div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-4">
          {/* Bouton annuler */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Cancel
          </button>

          {/* Bouton confirmer */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Validation des props (définir les types de props attendus) [props = propriétés]
Modal.propTypes = { // propTypes = vérifie que les bonnes propriétés (props) sont passées au composant
  onClose: PropTypes.func.isRequired, // Fonction pour l'action d'annulation
  onConfirm: PropTypes.func.isRequired, // Fonction pour l'action de confirmation
  children: PropTypes.node.isRequired, // Contenu du modal
};

export default Modal;
