import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
          >
            Linkly
          </Link>
        </div>

        <div className="mt-3">
          <p className="text-gray-500 dark:text-neutral-500 text-sm">
            © {currentYear} Linkly - Developed by Anthony Avellaneda Paitan 👨🏻‍💻.
          </p>
        </div>

        <div className="mt-3 space-x-2">
          <a
            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:ring-0 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
            href="https://github.com/AnthonyAvellaneda10"
            target="_blank"
          >
            <FaGithub />
          </a>
          <a
            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:ring-0 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
            href="https://x.com/TomStark08"
            target="_blank"
          >
            <BsTwitterX />
          </a>
          <a
            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:ring-0 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
            href="https://www.linkedin.com/in/anthonyavellanedapait%C3%A1n/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};
