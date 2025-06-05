import React from 'react';

const Analysis = () => {
  const images = [
    '/images/sneaker1.jpg',
    '/images/sneaker2.jpg',
    '/images/sneaker3.jpg',
  ];

  return (
    <div className="min-h-screen px-6 py-8 mt-16 text-white bg-black">
      <h1 className="mb-6 text-xl font-semibold">← Analysis</h1>

      {/* Images */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden border-2 rounded-lg border-lime-500"
          >
            <img src={src} alt={`Sneaker ${index + 1}`} className="object-cover w-full h-auto" />
          </div>
        ))}
      </div>

      {/* Info Table */}
      <div className="mb-8 space-y-3">
        <div className="p-3 bg-gray-900 rounded-md">
          <span className="font-bold">Name</span> : Basketball Sneakers
        </div>
        <div className="p-3 bg-gray-900 rounded-md">
          <span className="font-bold">Brand</span> : Nike
        </div>
        <div className="p-3 bg-gray-900 rounded-md">
          <span className="font-bold">Code</span> : #8566 664
        </div>
        <div className="p-3 bg-gray-900 rounded-md">
          <span className="font-bold">AI Review</span> : Authentic
        </div>
        <div className="p-3 bg-gray-900 rounded-md">
          <span className="font-bold">Confidence Score</span> : 80%
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6">
        <button className="px-6 py-2 text-red-500 transition bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white">
          Decline
        </button>
        <button className="px-6 py-2 text-black transition rounded bg-lime-500 hover:bg-lime-600">
          Approve
        </button>
      </div>
    </div>
  );
};

export default Analysis;
