import { useScrollLock } from "../../hooks/useScrollLock";
import { Close } from "../ui/Close";

interface DeleteLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteLinkModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteLinkModalProps) {
  useScrollLock(isOpen);
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`border-white bg-[#ffffff] dark:bg-[#09090b] p-6 rounded-lg shadow-lg w-[425px] transform transition-transform ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-lg font-bold text-[#090f1d] dark:text-[#f5f5f5]">Delete Link</h2>
        <p className="mt-4">
          Are you sure you want to delete this link? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:opacity-90 font-medium text-[#171f32] dark:bg-[#27272a] dark:hover:bg-[#212124] dark:text-[#f4f4f4] rounded-md transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#ef4444] hover:opacity-90 font-medium text-white rounded-md transition duration-300"
          >
            Delete
          </button>
        </div>
        <Close onClose={onClose} />
      </div>
    </div>
  );
}
