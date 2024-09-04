
import axios from 'axios';

export const getUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    throw error;
  }
};

export const fetchAllRepos = async (username) => {
    let page = 1;
    let allRepos = [];
    let fetchMore = true;
  
    while (fetchMore) {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch user repositories');
  
      const repos = await response.json();
      allRepos = [...allRepos, ...repos];
      page++;
      fetchMore = repos.length === 100; // Continue fetching if there are 100 repos
    }
  
    return allRepos;
  };
  
  export const getUserRepos = async (username) => {
    const repos = await fetchAllRepos(username);
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
    return {
      totalStars,
      reposCount: repos.length,
    };
  };
  