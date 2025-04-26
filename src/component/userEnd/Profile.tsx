import React from 'react';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'provider',
    joined: 'January 15, 2024',
    avatar:
      'https://i.pravatar.cc/150?img=3', // Placeholder avatar
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm mt-1 text-gray-500 capitalize">
            Role: {user.role}
          </p>
          <p className="text-sm text-gray-500">Joined: {user.joined}</p>
        </div>
        <button className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
