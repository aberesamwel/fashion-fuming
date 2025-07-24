import React from "react";

const Event = () => {
  const events = [
    { id: 1, title: "React Workshop", date: "2025-07-30", location: "Online" },
    { id: 2, title: "Tailwind CSS Masterclass", date: "2025-08-05", location: "Nairobi" },
    { id: 3, title: "JavaScript Conference", date: "2025-09-10", location: "Virtual" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {event.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400"> {event.date}</p>
            <p className="text-gray-600 dark:text-gray-400"> {event.location}</p>
            <button className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
