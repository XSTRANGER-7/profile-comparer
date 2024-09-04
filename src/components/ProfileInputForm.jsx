
import React, { useState } from 'react';

const ProfileInputForm = ({ handleSubmit }) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [compareUrls, setCompareUrls] = useState(['', '', '']);
  const [numProfiles, setNumProfiles] = useState(1);

  const handleCompareUrlChange = (index, value) => {
    const newCompareUrls = [...compareUrls];
    newCompareUrls[index] = value;
    setCompareUrls(newCompareUrls);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(profileUrl, compareUrls.filter(url => url));
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
      {[...Array(numProfiles)].map((_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`GitHub URL to compare ${index + 1}`}
          value={compareUrls[index]}
          onChange={(e) => handleCompareUrlChange(index, e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
        />
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
      >
        Compare Profiles
      </button>
      <div className="mt-2">
        <label htmlFor="numProfiles" className="block text-gray-700">Number of Profiles to Compare:</label>
        <select
          id="numProfiles"
          value={numProfiles}
          onChange={(e) => setNumProfiles(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg w-full"
        >
          {[1, 2, 3].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default ProfileInputForm;
