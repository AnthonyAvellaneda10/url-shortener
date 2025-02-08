import { useEffect, useState } from "react";
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
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNewLink(originalLink); // Reiniciar el input cuando se abre el modal
      setError(false); // Resetear el error
    }
  }, [isOpen, originalLink]);

  const isValidUrl = (url: string) => {
    const pattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,}(\/.*)?$/i;
    return pattern.test(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setNewLink(value);
    setError(!isValidUrl(value)); 
  };

  const handleSave = () => {
    if (error || !newLink.trim() || newLink === originalLink) {
      return; // No guardar si hay error, está vacío o no cambió
    }
    onSave(newLink);
    onClose();
  };

  const isDisabled = error || newLink === originalLink;

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
        <h2 className="text-lg font-bold text-[#090f1d] dark:text-[#f5f5f5]">
          Edit Link
        </h2>
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
            onChange={handleChange}
            placeholder="https://example.com"
            // className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black placeholder:text-gray-500 dark:bg-[#09090b] dark:border-[#252528] dark:text-[#f4f4f4] dark:placeholder-[#a3a3a4] dark:focus:ring-[#f5f5f5] focus:ring-blue-500 focus:border-blue-500 sm:text focus:outline-none focus:ring-1 transition duration-300"
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 text-black placeholder:text-gray-500 dark:bg-[#09090b] dark:border-[#252528] dark:text-[#f4f4f4] dark:placeholder-[#a3a3a4]  sm:text focus:ring-1 focus:outline-none
              ${
                error
                  ? "border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-[#f5f5f5]"
              } 
              transition duration-300`}
          />
        </div>

        {/* Contenedor con transición suave */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ${
            error ? "max-h-10" : "max-h-0"
          }`}
        >
          {error && (
            <p className="text-red-500 text-sm mt-1 opacity-100 translate-y-0 transition-all duration-300">
              Ingrese una URL válida.
            </p>
          )}
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
            disabled={isDisabled}
            className={`px-4 py-2 rounded-md font-medium transition duration-300 ${
              isDisabled
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Save changes
          </button>
        </div>

        <Close onClose={onClose} />
      </div>
    </div>
  );
}
