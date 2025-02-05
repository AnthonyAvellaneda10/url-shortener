import { useState } from "react";
import { Close } from "../ui/Close";
import { useScrollLock } from "../../hooks/useScrollLock";

interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newLink: string) => void;
  originalLink: string;
}

export function EditLinkModal({
  isOpen,
  onClose,
  onSave,
  originalLink,
}: EditLinkModalProps) {
  useScrollLock(isOpen);
  const [newLink, setNewLink] = useState(originalLink);

  const handleSave = () => {
    onSave(newLink);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`border border-white bg-[#ffffff] dark:bg-[#09090b] p-6 rounded-lg shadow-lg w-[425px] transform transition-transform ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-lg font-bold text-[#090f1d] dark:text-[#f5f5f5]">Edit Link</h2>
        <div className="mt-4">
          <label
            htmlFor="link"
            className="block text-sm font-medium dark:text-[#f4f4f4] text-gray-700"
          >
            Link
          </label>
          <input
            id="link"
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="https://example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black placeholder:text-gray-500 dark:bg-[#09090b] dark:border-[#252528] dark:text-[#f4f4f4] dark:placeholder-[#a3a3a4] dark:focus:ring-[#f5f5f5] focus:ring-blue-500 focus:border-blue-500 sm:text focus:outline-none focus:ring-1 transition duration-300"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#f1f5f9] hover:opacity-80 text-[#171f32] dark:bg-[#27272a] dark:hover:bg-[#212124] dark:text-[#f4f4f4] rounded-md font-medium transition duration-300" // Se cambió el color de fondo y texto
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#2563eb] hover:bg-[#3a72ec] dark:bg-[#fafafa] dark:hover:bg-[#e2e2e2] text-white dark:text-[#252528] rounded-md font-medium transition duration-300"
          >
            Save changes
          </button>
        </div>

        <Close onClose={onClose} />
      </div>
    </div>
  );
}
