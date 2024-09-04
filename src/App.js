import React, { useState } from 'react';
import ProfileInputForm from './components/ProfileInputForm';
import ComparisonCharts from './components/ComparisonCharts';
import ErrorBoundary from './components/ErrorBoundary';

import { getUserData, getUserRepos } from './services/api/githubApi';

const App = () => {
  const [comparisonData, setComparisonData] = useState(null);

  const handleCompare = async (profileUrl, compareUrls) => {
    try {
      const profileUsername = profileUrl.split('/').pop();
      const compareUsernames = compareUrls.map(url => url.split('/').pop());

      const profileData = await getUserData(profileUsername);
      const profileReposData = await getUserRepos(profileUsername);

      const compareDataPromises = compareUsernames.map(async (username) => {
        const userData = await getUserData(username);
        const reposData = await getUserRepos(username);
        return {
          username: userData.login,
          stars: reposData.totalStars,
          prs: 25,  
          repos: reposData.reposCount,
        };
      });

      const compareData = await Promise.all(compareDataPromises);

      setComparisonData({
        profileData: {
          username: profileData.login,
          stars: profileReposData.totalStars,
          prs: 30,  
          repos: profileReposData.reposCount,
        },
        compareData,
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
