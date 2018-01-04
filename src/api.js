/*******************************************************
 * GitHub Search API
 *
 * This service provides functions for searching
 * repositories based on keyword/s and paginating
 * search results
 *
 * Simon Schwartz
 *******************************************************/

import axios from 'axios';
import parseLinks from 'parse-link-header';
import {
  updateSearchResults,
  addPaginationButtons,
  removePaginationButtons,
  setErrorMessage,
  setLoadingState
} from './ui';

/**
 * Add event listener to pagination container
 * This listener uses event bubbling to fire the correct pagination endpoint
 *
 * @param {Object} parsedHeaderLinks - the parsed header links from an API response
 *
 */
const addPaginationEventListener = parsedHeaderLinks => {
  const paginationContainer = document.getElementById('paginationContainer');

  paginationContainer.addEventListener(
    'click',
    event => {
      const clickedButtonID = event.target.id;
      switch (clickedButtonID) {
        case 'first':
          paginateSearchResults(parsedHeaderLinks.first.url);
          break;
        case 'prev':
          paginateSearchResults(parsedHeaderLinks.prev.url);
          break;
        case 'next':
          paginateSearchResults(parsedHeaderLinks.next.url);
          break;
        case 'last':
          paginateSearchResults(parsedHeaderLinks.last.url);
          break;
        default:
          break;
      }
    },
    { once: true }
  );
};

/**
 * Updates the User Inteface based on data from successful API response
 *
 * @param {Array}  searchResults - List of paginated search result items
 * @param {String} headerLinks   - Link Metadata from API response (optional)
 *
 */
const updateUI = (searchResults, headerLinks) => {
  setErrorMessage(''); // ensure error message is empty when API response succeeds
  if (headerLinks) {
    const parsedHeaderLinks = parseLinks(headerLinks);
    addPaginationButtons(parsedHeaderLinks);
    addPaginationEventListener(parsedHeaderLinks);
  } else {
    removePaginationButtons();
  }
  updateSearchResults(searchResults);
};

/**
 * Fetch a list of repositories based on keyword search
 * https://developer.github.com/v3/search/#search-repositories
 *
 * @param {String} keywords - Search keyword/s
 *
 */
export const searchRepositories = keywords => {
  const endpoint = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    keywords
  )}`;
  setLoadingState(true);
  return axios
    .get(endpoint)
    .then(response => {
      setLoadingState(false);
      updateUI(response.data.items, response.headers.link);
    })
    .catch(error => {
      setLoadingState(false);
      setErrorMessage(error.message);
    });
};

/**
 * Paginates the current search results
 * The endpoint should be supplied from header links in API response
 *
 * @param {String} endpoint - The endpoint supplied from API header links
 *
 */
export const paginateSearchResults = endpoint => {
  setLoadingState(true);
  return axios
    .get(endpoint)
    .then(response => {
      setLoadingState(false);
      updateUI(response.data.items, response.headers.link);
    })
    .catch(error => {
      setLoadingState(false);
      setErrorMessage(error.message);
    });
};
