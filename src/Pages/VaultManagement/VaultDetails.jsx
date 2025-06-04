import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { generateDummyData } from "./VaultManagement";

const dummyDataCache = new Map();

export function setDummyDataCache(data) {
  data.forEach((item) => dummyDataCache.set(item.id.toString(), item));
}

const VaultDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (dummyDataCache.size === 0) {
      const data = generateDummyData(50);
      setDummyDataCache(data);
    }
    setItem(dummyDataCache.get(id));
  }, [id]);

  useEffect(() => {
    if (!item) return;
    const list = Array(9).fill({
      date: "12/05/25",
      sneakers: "Basketball",
      brand: "Adidas",
      status: "Pending",
      authentic: "Null",
    });

    // override some statuses to match screenshot style
    list[0] = { ...list[0], status: "Completed", authentic: "95% (Pass)" };
    list[1] = { ...list[1], status: "Completed", authentic: "95% (Pass)" };
    list[2] = { ...list[2], status: "Completed", authentic: "95% (Pass)" };
    list[4] = { ...list[4], status: "Rejected", authentic: "95% (Not Pass)" };
    list[6] = { ...list[6], status: "Rejected", authentic: "95% (Not Pass)" };
    list[8] = { ...list[8], status: "Rejected", authentic: "95% (Not Pass)" };

    setFilteredItems(
      list.filter(
        (row) =>
          row.sneakers.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.authentic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.date.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, item]);

  if (!item) {
    return (
      <div className="min-h-screen p-6 mt-16 font-sans text-white bg-black">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-green-500"
        >
          ← Back
        </button>
        <p className="text-center text-gray-400">Item not found.</p>
      </div>
    );
  }

  // Function to get status color like screenshot
  const statusColor = (status) => {
    if (status === "Completed") return "text-green-500";
    if (status === "Pending") return "text-yellow-400";
    if (status === "Rejected") return "text-red-600";
    return "text-white";
  };

  return (
    <div className="min-h-screen p-6 mx-auto mt-16 font-sans text-white bg-black ">
      {/* Header with back and user name */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-4 mb-6"
      >
        <FaArrowLeftLong size={24} />

        <h1 className="text-2xl font-semibold">{item.userName}</h1>

        {/* Search input */}
        <input
          type="search"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-auto px-3 py-1 text-white placeholder-gray-500 bg-transparent border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-green-500 min-w-[200px]"
        />
      </div>

      {/* Data table */}
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr>
            <th className="py-3 px-2 min-w-[100px]">Date</th>
            <th className="py-3 px-2 min-w-[150px]">Sneakers</th>
            <th className="py-3 px-2 min-w-[100px]">Brand</th>
            <th className="py-3 px-2 min-w-[100px]">Status</th>
            <th className="py-3 px-2 min-w-[120px]">Authentic</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((row, index) => (
              <tr key={index} className=" hover:bg-gray-900">
                <td className="px-2 py-3">{row.date}</td>
                <td className="px-2 py-3">{row.sneakers}</td>
                <td className="px-2 py-3">{row.brand}</td>
                <td
                  className={`px-2 py-3 font-semibold ${statusColor(
                    row.status
                  )}`}
                >
                  {row.status}
                </td>
                <td className="px-2 py-3">{row.authentic}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VaultDetails;
