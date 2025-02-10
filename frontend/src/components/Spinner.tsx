export const Spinner = () => {
  return (
    <div className="max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 mx-auto">
      <div className="flex flex-col animate-pulse">
        <div className="overflow-x-auto pb-4">
          <div className="block">
            <div className="overflow-x-auto w-full border rounded-lg border-gray-300">
              <table className="w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      <div className="h-4 bg-gray-200 rounded w-4"></div>
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      <div className="h-4 bg-gray-200 rounded w-36"></div>
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                    >
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                    >
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <tr
                      key={index}
                      className="bg-white transition-all duration-500 hover:bg-gray-50"
                    >
                      <td className="p-5">
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="w-48 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="h-4 bg-gray-200 rounded w-36"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
