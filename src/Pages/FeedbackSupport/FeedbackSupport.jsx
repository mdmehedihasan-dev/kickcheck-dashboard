import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const PAGE_SIZE = 15;

// Dummy data generation
function generateDummyFeedbackData(count = 50) {
  const statuses = ["Replied", "Pending"];
  const userName = "Hasnain Jarir";
  const description = "Ensures only authorized users can access.";
  const date = "12/05/25";

  const data = [];
  for (let i = 1; i <= count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    data.push({
      id: i,
      userName,
      description,
      date,
      status,
    });
  }
  return data;
}

// Modal Component
const ReplyModal = ({ isOpen, onClose, feedback }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg">
        
        <h2 className="mb-4 text-lg font-semibold">Reply</h2>
        
        <button
          onClick={onClose}
          className="absolute text-gray-600 top-3 right-3 hover:text-gray-900"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="replyText">
            Reply
          </label>
          <textarea
            id="replyText"
            rows={6}
            className="w-full p-2 border border-gray-300 rounded resize-none"
            defaultValue={`Reply to: ${feedback.userName}\n\n${feedback.description}`}
          />
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const FeedbackSupport = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const dummyData = generateDummyFeedbackData(1239);
    setData(dummyData);
  }, []);

  // Filter data
  const filteredData = data.filter((item) =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [searchQuery, totalPages, page]);

  const paginateData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Open modal on clicking Replied status
  const handleStatusClick = (item) => {
    if (item.status === "Replied") {
      setSelectedFeedback(item);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen p-6 mx-auto mt-16 font-sans bg-black ">
      {/* Header */}
      <div className="flex items-center mb-6">
          <Link
        to={"/"}
        className="flex items-center text-white gap-x-3"
      >
        <FaArrowLeftLong size={20} />
        <h1 className="text-2xl font-semibold "> Feedback & Support</h1>
      </Link>

       

        <input
          type="search"
          placeholder="Search by user name..."
          className="px-3 py-1 ml-auto text-white placeholder-gray-500 bg-transparent border rounded focus:outline-none focus:ring-1 focus:ring-green-600"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 pb-2 mb-4 text-xs font-semibold text-gray-400 border-b select-none">
        <div>User Name</div>
        <div>Description</div>
        <div>Last Update</div>
        <div>Status</div>
      </div>

      {/* Table Rows */}
      <div>
        {paginateData.map(({ id, userName, description, date, status }) => (
          <div
            key={id}
            className="grid items-center grid-cols-4 gap-4 py-3 text-sm text-white border-b border-gray-900"
          >
            <div>{userName}</div>
            <div className="opacity-80">{description}</div>
            <div className="opacity-80">{date}</div>
            <div
              onClick={() => handleStatusClick({ id, userName, description, date, status })}
              className={`flex items-center gap-1 text-sm cursor-pointer ${
                status === "Replied" ? "text-green-400" : "text-yellow-400"
              }`}
              title={status === "Replied" ? "Click to reply" : ""}
            >
              {status === "Replied" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" />
                </svg>
              )}
              {status}
            </div>
          </div>
        ))}
        {paginateData.length === 0 && (
          <div className="py-4 text-center text-gray-500">No results found.</div>
        )}
      </div>

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
            if (page > totalPages - 2) {
              startPage = Math.max(totalPages - 2, 1);
            } else if (page > 2) {
              startPage = page - 1;
            }
            const pages = [];
            for (let i = startPage; i < startPage + 3 && i <= totalPages; i++) {
              pages.push(i);
            }
            return pages.map((pNum) => (
              <button
                key={pNum}
                className={`px-3 py-1 border rounded-full ${
                  page === pNum ? "bg-green-600 text-white border-green-600" : "border-gray-600"
                }`}
                onClick={() => setPage(pNum)}
              >
                {pNum}
              </button>
            ));
          })()}

          {totalPages > 3 && totalPages !== page && (
            <span className="text-gray-500">... {totalPages}</span>
          )}

          <button
            className="flex items-center gap-2 px-3 py-1 text-sm rounded disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            <p>Next</p>
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Modal */}
      <ReplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feedback={selectedFeedback}
      />
    </div>
  );
};

export default FeedbackSupport;
