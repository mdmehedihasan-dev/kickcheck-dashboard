// VaultManagement.jsx
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { Link } from "react-router-dom";

export function generateDummyData(count = 50) {
  const categories = ["Basic", "Collector", "Pro"];
  const brands = ["Adidas", "Nike", "Puma", "Reebok"];
  const userNames = ["Anika Paul", "John Doe", "Jane Smith", "Michael Lee"];
  const avatars = [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/45.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/22.jpg",
  ];

  const data = [];

  for (let i = 1; i <= count; i++) {
    const day = Math.floor(Math.random() * 31) + 1;
    const date = `12/${day.toString().padStart(2, "0")}/25`;

    const userIndex = Math.floor(Math.random() * userNames.length);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const totalSneakers = Math.floor(Math.random() * 170) + 30;
    const percent = Math.floor(Math.random() * 10) + 90;
    const authentic = `${percent}% (Pass)`;
    const status = ["Completed", "Pending", "Rejected"][Math.floor(Math.random() * 3)];

    data.push({
      id: i,
      date,
      userName: userNames[userIndex],
      avatar: avatars[userIndex],
      category,
      brand,
      totalSneakers,
      authentic,
      status,
    });
  }

  return data;
}

const PAGE_SIZE = 10;

const VaultManagement = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const dummyData = generateDummyData();
    setData(dummyData);
  }, []);

  const filteredData = data.filter((item) =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTotalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  useEffect(() => {
    if (page > filteredTotalPages) {
      setPage(1);
    }
  }, [searchQuery, filteredTotalPages, page]);

  const paginateData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen p-6 mt-16 font-sans text-white bg-black">
      <div className="flex items-center mb-6">
        <Link to={'/'} className="flex items-center gap-x-3">
          <FaArrowLeftLong size={20} />
          <h1 className="text-2xl font-semibold">Vault Management</h1>
        </Link>
        <input
          type="search"
          placeholder="Search here..."
          className="px-3 py-1 ml-auto text-white placeholder-gray-500 bg-transparent border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-2 min-w-[100px]">Date</th>
            <th className="py-3 px-2 min-w-[150px]">User Name</th>
            <th className="py-3 px-2 min-w-[100px]">Category</th>
            <th className="py-3 px-2 min-w-[100px]">Brand</th>
            <th className="py-3 px-2 min-w-[120px]">Total Sneakers</th>
            <th className="py-3 px-2 min-w-[120px]">Authentic</th>
            <th className="py-3 px-2 min-w-[100px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginateData.map((item) => (
            <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-900">
              <td className="px-2 py-3">{item.date}</td>
              <td className="flex items-center gap-3 px-2 py-3">
                <img
                  src={item.avatar}
                  alt={item.userName}
                  className="object-cover w-8 h-8 rounded-full"
                />
                {item.userName}
              </td>
              <td className="px-2 py-3">{item.category}</td>
              <td className="px-2 py-3">{item.brand}</td>
              <td className="px-2 py-3">{item.totalSneakers}</td>
              <td className="px-2 py-3 ">{item.authentic}</td>
              <td className="flex justify-center gap-2 px-2 py-3">
                <Link
                  to={`/vault-management/${item.id}`}
                  aria-label="View"
                  className="hover:text-green-500"
                  title="View"
                >
                  <IoEyeOffOutline size={20} />
                </Link>
                <button aria-label="Delete" className="hover:text-red-500" title="Delete">
                  <MdBlock size={20} />
                </button>
              </td>
            </tr>
          ))}
          {paginateData.length === 0 && (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 text-sm text-white gap-x-28">
        <span>
          Showing {Math.min(page * PAGE_SIZE, filteredData.length)} out of {filteredData.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-3 py-1 text-sm rounded disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            <IoIosArrowBack />
            <p>Previous</p>
          </button>

          {(() => {
            let startPage = 1;
            if (page > filteredTotalPages - 2) {
              startPage = Math.max(filteredTotalPages - 2, 1);
            } else if (page > 2) {
              startPage = page - 1;
            }
            const pages = [];
            for (let i = startPage; i < startPage + 3 && i <= filteredTotalPages; i++) {
              pages.push(i);
            }
            return pages.map((pNum) => (
              <button
                key={pNum}
                className={`px-3 py-1 border rounded-full ${
                  page === pNum
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-600"
                }`}
                onClick={() => setPage(pNum)}
              >
                {pNum}
              </button>
            ));
          })()}

          {filteredTotalPages > 3 && filteredTotalPages !== page && (
            <span className="text-gray-500">... {filteredTotalPages}</span>
          )}

          <button
            className="flex items-center gap-2 px-3 py-1 text-sm rounded disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(p + 1, filteredTotalPages))}
            disabled={page === filteredTotalPages}
          >
            <p>Next</p>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaultManagement;