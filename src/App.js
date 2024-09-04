import React, { useState } from 'react';
import ProfileInputForm from './components/ProfileInputForm';
import ComparisonCharts from './components/ComparisonCharts';
import ErrorBoundary from './components/ErrorBoundary';

import { getUserData, getUserRepos } from './services/api/githubApi';

const App = () => {
  const [comparisonData, setComparisonData] = useState(null);

  const handleCompare = async (profileUrl, compareUrl) => {
    try {
      const profileUsername = profileUrl.split('/').pop();
      const compareUsername = compareUrl.split('/').pop();

      const profileData = await getUserData(profileUsername);
      const compareData = await getUserData(compareUsername);

      const profileReposData = await getUserRepos(profileUsername);
      const compareReposData = await getUserRepos(compareUsername);

      setComparisonData({
        profileData: {
          username: profileData.login,
          stars: profileReposData.totalStars,
          prs: 30, 
          repos: profileReposData.reposCount,
        },
        compareData: {
          username: compareData.login,
          stars: compareReposData.totalStars,
          prs: 25, // Replace with real PR data if available
          repos: compareReposData.reposCount,
        },
      });
    } catch (error) {
      console.error('Error comparing profiles:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">GitHub Profile Comparison</h1>
      <ProfileInputForm handleSubmit={handleCompare} />
      {comparisonData && (
        <ErrorBoundary>
          <ComparisonCharts comparisonData={comparisonData} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default App;
