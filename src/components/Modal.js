import React from "react";
import PropTypes from "prop-types"; // import PropTypes for type checking component props

// modal component for confirmation dialogs
const Modal = ({ onClose, onConfirm, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="mb-4">{children}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Cancel
          </button>
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

// property validation
Modal.propTypes = {
  onClose: PropTypes.func.isRequired, // function for cancel action
  onConfirm: PropTypes.func.isRequired, // function for confirm action
  children: PropTypes.node.isRequired, // modal content
};

export default Modal;