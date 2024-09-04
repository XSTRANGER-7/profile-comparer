import React, { useState } from 'react';

const ProfileInputForm = ({ handleSubmit }) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [compareUrl, setCompareUrl] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(profileUrl, compareUrl);
  };

  return (
    <form onSubmit={onSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Your GitHub URL"
        value={profileUrl}
        onChange={(e) => setProfileUrl(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
      />
      <input
        type="text"
        placeholder="GitHub URL to compare"
        value={compareUrl}
        onChange={(e) => setCompareUrl(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
      >
        Compare Profiles
      </button>
    </form>
  );
};

export default ProfileInputForm;
