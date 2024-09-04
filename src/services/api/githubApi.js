import axios from 'axios';
 
const token = process.env.REACT_APP_GITHUB_TOKEN;

if (!token) {
  throw new Error('GitHub token is not defined in .env');
}
 
export const getUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    throw error;
  }
};
 
const fetchAllRepos = async (username) => {
  let page = 1;
  let allRepos = [];
  let fetchMore = true;

  while (fetchMore) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`, {
        headers: {
          Authorization: `token ${token}`
        }
      });
      const repos = response.data;
      allRepos = [...allRepos, ...repos];
      page++;
      fetchMore = repos.length === 100;
    } catch (error) {
      console.error('Failed to fetch user repositories:', error);
      throw error;
    }
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
const fetchLanguages = async (username) => {
    const repos = await fetchAllRepos(username);
    const languages = {};
  
    for (const repo of repos) {
      try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/languages`, {
          headers: {
            Authorization: `token ${token}`
          }
        });
        for (const [lang, lines] of Object.entries(response.data)) {
          languages[lang] = (languages[lang] || 0) + lines;
        }
      } catch (error) {
        console.error('Failed to fetch repository languages:', error);
      }
    }
  
    return languages;
  };
  
  export const getUserLanguages = async (username) => {
    const languages = await fetchLanguages(username);
    return languages;
  };
  