import React from "react";
import KeyGenerateForm from "./KeyGenerateForm";

const KeyModal = ({ showModal, setShowModal, formData, handleInputChange, handleToggleChange, handleSelectAll, selectAll, handleSubmit }) => {
  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-1/2"> 
          <h2 className="text-xl font-semibold mb-4">Generate Key</h2>
          <KeyGenerateForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleToggleChange={handleToggleChange}
            handleSelectAll={handleSelectAll}
            selectAll={selectAll}
          />
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Close
            </button>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default KeyModal;