import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const generateNotifications = (count = 50) => {
  const messages = [
    "A new user has applied for gold membership packages and waiting for approval, review the application for approval or",
    "Swap ID #12344 failed due to insufficient balance on User A's account. Swap ID #12344 failed due to insufficient",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    message: messages[i % messages.length],
    time: "Just Now",
  }));
};

const PAGE_SIZE = 15;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setNotifications(generateNotifications(1239)); // simulate full length
  }, []);

  const totalPages = Math.ceil(notifications.length / PAGE_SIZE);
  const currentItems = notifications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="min-h-screen p-6 mt-16 font-sans text-white bg-black">
      <div className="mb-6">
        <div className="flex items-center gap-x-3">
          <FaArrowLeftLong size={20} />
          <div>
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <p className="text-sm text-gray-400">
              Total {notifications.length} Notifications
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {currentItems.map((notif) => (
          <div
            key={notif.id}
            className="flex justify-between pb-2 text-sm border-b border-gray-800"
          >
            <span>{notif.message}</span>
            <span className="text-gray-400 whitespace-nowrap">
              {notif.time}
            </span>
          </div>
        ))}
      </div>

      
      {/* Pagination */}
<div className="flex items-center justify-center mt-6 text-sm text-white gap-x-28">
  <span>
    Showing {Math.min(page * PAGE_SIZE, notifications.length)} out of{" "}
    {notifications.length}
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

    {totalPages > 3 && (
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

    </div>
  );
};

export default Notifications;
