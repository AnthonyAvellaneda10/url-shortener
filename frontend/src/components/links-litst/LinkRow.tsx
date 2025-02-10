import { Copy, ExternalLink, Pencil, Trash } from "lucide-react";
import { formatDate } from "../../lib/utils";
import toast from "react-hot-toast";
import { QRCodeGenerate } from "./QRCodeGenerate";
import { getFavicon } from "../../lib/getFavicon";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface LinkRowProps {
  link: {
    id: string;
    short_code: string;
    url: string;
    access_count: number;
    updated_at: string;
    host: string;
  };
  index: number;
  className?: string;
  onClick?: () => void;
}

export const LinkRow = ({
  link: { short_code, url, access_count, updated_at, host },
  index,
  onEdit,
  onDelete,
}: LinkRowProps & { onEdit: () => void; onDelete: () => void }) => {;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${host}/${short_code}`);
      toast.success(`URL short copied to clipboard`);
    } catch (error) {
      toast.error("Clipboard write failed. ");
    }
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {index + 1}
        </td>
        <td className="px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
              {`${BACKEND_URL}/${short_code}`}
            </span>
            <button
              onClick={copyToClipboard}
              type="button"
              className="hover:bg-[#f1f5f9] dark:hover:bg-[#172134] text-black dark:text-white p-1.5 transition duration-300 rounded-full"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </td>

        <th
          scope="row"
          className="px-4 py-2 gap-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="flex items-center gap-2">
            <img
              src={getFavicon(url, "light")}
              alt="Website Icon"
              className="w-auto h-6 mr-3 dark:hidden"
            />
            <img
              src={getFavicon(url, "dark")}
              alt="Website Icon"
              className="w-auto h-6 mr-3 hidden dark:block"
            />
            {url.length > 30 ? `${url.substring(0, 30)}...` : url}
            <button
              onClick={() => window.open(url, "_blank")}
              type="button"
              className="hover:bg-[#f1f5f9] dark:hover:bg-[#172134] text-black dark:text-white p-1.5 transition duration-300 rounded-full"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </th>

        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <QRCodeGenerate value={`${host}/${short_code}`} />
        </td>

        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div className="flex items-center">{access_count}</div>
        </td>
        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {formatDate(updated_at)}
        </td>

        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="border dark:border-[#8b8e93] hover:bg-[#f1f5f9] dark:hover:bg-[#172134] text-black dark:text-white p-2 transition duration-300 rounded-full"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="border dark:border-[#8b8e93] hover:bg-[#f1f5f9] dark:hover:bg-[#172134] text-black dark:text-white p-2 transition duration-300 rounded-full"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
