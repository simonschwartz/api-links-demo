/*******************************************************
 * GitHub Search API
 *
 * This service provides a simple search function for
 * finding repositories based on keyword/s
 *
 * Author: Simon Schwartz
 *******************************************************/

import axios from 'axios';
const GithubSearchEndpoint = 'https://api.github.com/search/repositories';

/**
 * Fetch a list of repositories based on keyword search
 * https://developer.github.com/v3/search/#search-repositories
 *
 * @param {string} keywords
 *
 * @return {promise}
 */
export const searchRepositories = keywords => {
  const endpoint = `${GithubSearchEndpoint}?q=${encodeURIComponent(
    keywords
  )}&per_page=10`;

  return axios.get(endpoint).then(response => console.log(response));
};
