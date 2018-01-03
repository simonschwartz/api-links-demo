/*******************************************************
 * GitHub Search API
 *
 * This service provides a simple search function for
 * finding repositories based on keyword/s
 *
 *******************************************************/

import axios from 'axios';
import parseLinks from 'parse-link-header';
import { setPaginationUI } from './ui';
const GithubSearchEndpoint = 'https://api.github.com/search/repositories';

/**
 * Fetch a list of repositories based on keyword search
 * https://developer.github.com/v3/search/#search-repositories
 *
 * @param {string} keywords
 *
 * @return {promise} response body and object of pagination list
 */
export const searchRepositories = keywords => {
  const endpoint = `${GithubSearchEndpoint}?q=${encodeURIComponent(keywords)}`;
  return axios
    .get(endpoint)
    .then(response => setPaginationUI(response.headers.link));
};

/**
 * Paginates the current search results using endpoint
 * supplied in response header links
 *
 * @param {string} endpoint
 *
 * @return {promise}
 */
export const paginateSearchResults = endpoint => {
  return axios
    .get(endpoint)
    .then(response => setPaginationUI(response.headers.link));
};
