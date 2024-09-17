<Modal isOpen={isModalOpen} onClose={closeModal}>
  <h2 className="text-xl font-bold mb-4">Modal Title</h2>
  <p>This is a simple modal with Tailwind CSS.</p>
  <button
    onClick={closeModal}
    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
  >
    Close
  </button>
</Modal>;
