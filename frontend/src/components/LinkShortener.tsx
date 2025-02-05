import { URLShortenerForm } from "./URLShortenerForm";

export const LinkShortener = () => {

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            Shorten Your Loooong Links :)
          </span>
        </h1>
        <p className="text-gray-700 dark:text-gray-400 max-w-xl mx-auto">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
      </div>

      <URLShortenerForm />
    </div>
  );
};
