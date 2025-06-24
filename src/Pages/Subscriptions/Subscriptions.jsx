import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

const generateSubscriptionData = (count = 50) => {
  const planNames = ["Basic", "Pro", "Collector"];
  const prices = ["4.99$", "10.99$", "20.00$"];
  const users = ["Hasnain Jarir", "John Doe", "Jane Smith"];
  const methods = ["Stripe", "PayPal"];
  const today = "12/05/25";

  const data = [];
  for (let i = 1; i <= count; i++) {
    const index = i % 3;
    data.push({
      id: i,
      date: today,
      userName: users[index],
      planName: planNames[index],
      price: prices[index],
      paymentMethod: methods[index % 2],
      expireDate: today,
      description: "",
    });
  }

  return data;
};

const Subscriptions = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [editSubscription, setEditSubscription] = useState(null);

  useEffect(() => {
    setData(generateSubscriptionData());
  }, []);

  const handleEditChange = (field, value) => {
    setEditSubscription((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    const updated = data.map((item) =>
      item.id === editSubscription.id ? editSubscription : item
    );
    setData(updated);
    setEditSubscription(null);
  };

  const filteredData = data.filter((item) =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  return (
    <div className="min-h-screen p-6 mt-16 font-sans text-white bg-black">
      <div className="flex items-center mb-6">
         <Link to={'/'} className="flex items-center text-white gap-x-3">
                  <FaArrowLeftLong size={20} />
                  <h1 className="text-2xl font-semibold ">Subscription & Payment</h1>
                </Link>
        <input
          type="search"
          placeholder="Search here..."
          className="px-3 py-1 ml-auto text-white placeholder-gray-500 bg-transparent border border-gray-600 rounded"
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
            <th className="px-2 py-3">Date</th>
            <th className="px-2 py-3">User Name</th>
            <th className="px-2 py-3">Plan Name</th>
            <th className="px-2 py-3">Price</th>
            <th className="px-2 py-3">Payment Method</th>
            <th className="px-2 py-3">Expire Date</th>
            <th className="px-2 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-900">
              <td className="px-2 py-3">{item.date}</td>
              <td className="px-2 py-3">{item.userName}</td>
              <td className="px-2 py-3">{item.planName}</td>
              <td className="px-2 py-3">{item.price}</td>
              <td className="px-2 py-3">{item.paymentMethod}</td>
              <td className="px-2 py-3">{item.expireDate}</td>
              <td className="flex px-2 gap-x-4">
                <button onClick={() => setSelectedSubscription(item)}>
                  <IoEyeOutline />
                </button>
                <button onClick={() => setEditSubscription(item)} className="flex items-center gap-1">
                  <CiEdit/>
                </button>
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 text-sm gap-x-10">
        <span>
          Showing {Math.min(page * PAGE_SIZE, filteredData.length)} of {filteredData.length}
        </span>
        <div className="flex gap-2">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </button>
          {[...Array(totalPages).keys()].slice(0, 3).map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "bg-green-500 p-2 rounded-full" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* View Modal */}
      {selectedSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="p-6 bg-white rounded-md w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-black">Description</h2>
              <button onClick={() => setSelectedSubscription(null)} className="text-red-500">
                <MdClose size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-2 text-sm text-black">
              <div className="p-2 bg-gray-300 rounded">Plan Name : {selectedSubscription.planName}</div>
              <div className="p-2 bg-gray-300 rounded">User Name : {selectedSubscription.userName}</div>
              <div className="p-2 bg-gray-300 rounded">Price : {selectedSubscription.price}</div>
              <div className="p-2 bg-gray-300 rounded">Plan Duration : One Month</div>
              <div className="p-2 bg-gray-300 rounded">Subscription Date : {selectedSubscription.date}</div>
              <div className="p-2 bg-gray-300 rounded">Expire Date : {selectedSubscription.expireDate}</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="p-6 bg-white rounded-md w-[360px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black">Edit</h2>
              <button onClick={() => setEditSubscription(null)} className="text-red-500">
                <MdClose size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3 text-sm text-black">
              <div>
                <label className="block mb-1">Subscription Name</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editSubscription.planName}
                  onChange={(e) => handleEditChange("planName", e.target.value)}
                >
                  <option value="Basic">Basic</option>
                  <option value="Pro">Pro</option>
                  <option value="Collector">Collector</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Subscription Fee</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editSubscription.price}
                  onChange={(e) => handleEditChange("price", e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={3}
                  placeholder="Description here"
                  value={editSubscription.description}
                  onChange={(e) => handleEditChange("description", e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setEditSubscription(null)}
                  className="px-6 py-2 text-red-500 border border-red-500 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 text-white bg-green-600 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
