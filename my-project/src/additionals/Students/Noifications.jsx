import React from 'react';

const notificationsData = [
  {
    title: 'Exam Dates Released',
    date: '2024-12-01',
    description: 'The examination schedule for all departments has been released. Please check the exam portal for details.',
    type: 'Exam Date',
  },
  {
    title: 'Semester 1 Results',
    date: '2024-11-20',
    description: 'Results for the Semester 1 exams are now available. Please log in to the student portal to view your results.',
    type: 'Exam Result',
  },
  {
    title: 'Holiday Notice',
    date: '2024-11-25',
    description: 'College will remain closed on 25th November due to the national holiday.',
    type: 'Notification',
  },
];

const Notifications = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Notifications</h2>
      <div className="space-y-4">
        {notificationsData.map((notification, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{notification.title}</h3>
            <p className="text-gray-600 text-sm mb-1">{notification.date}</p>
            <p className="text-gray-800 mb-2">{notification.description}</p>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                notification.type === 'Exam Date'
                  ? 'bg-blue-100 text-blue-700'
                  : notification.type === 'Exam Result'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {notification.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
