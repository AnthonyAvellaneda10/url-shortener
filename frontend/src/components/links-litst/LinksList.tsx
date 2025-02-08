import { useState } from "react";
import { Link } from "../../interfaces/link.interface";
import { DeleteLinkModal } from "../modals/DeleteLinkModal";
import { EditLinkModal } from "../modals/EditLinkModal";
import { LinkRow } from "./LinkRow";
import { useUrlShortenerContext } from "../../context/UrlShortenerContext";

interface LinksListProps {
  links: Link[]; // Acepta 'links' como prop
}

export const LinksList = ({ links }: LinksListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const { updateUrl, deleteUrl } = useUrlShortenerContext();

  const handleEdit = (link: Link) => {
    setSelectedLink(link);
    setIsEditModalOpen(true);
  };

  const handleDelete = (link: Link) => {
    setSelectedLink(link);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = async (newUrl: string) => {
    if (selectedLink) {
      await updateUrl(selectedLink.short_code, newUrl);
      setIsEditModalOpen(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedLink) {
      await deleteUrl(selectedLink.short_code);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="px-4 mx-auto max-w-screen-2xl mt-8">
        {links.length > 0 ? (
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-[#181e29] dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      #
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Short Link
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Original Link
                    </th>
                    <th scope="col" className="px-4 py-3">
                      QR Code
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Clicks
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link, index) => (
                    <LinkRow
                      key={link.id}
                      link={link}
                      index={index}
                      onEdit={() => handleEdit(link)}
                      onDelete={() => handleDelete(link)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 dark:text-white text-center">
            No hay links creados, comience creando uno 🤓
          </p>
        )}
      </div>

      {/* Modales FUERA de la tabla */}
      <EditLinkModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        originalLink={selectedLink?.url || ""}
      />

      <DeleteLinkModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
