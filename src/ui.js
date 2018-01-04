/*******************************************************
 * Functions that render User Interface components
 *
 * This service provides functions for updating
 * the User Interface
 *
 * Simon Schwartz
 *******************************************************/

/**
 * Adds relevant pagination buttons to the UI
 *
 * @param {Object} paginationLinks - the parsed API response pagination header links
 *
 */
export const addPaginationButtons = parsedHeaderLinks => {
  // We use an array to control the order they are displayed in the UI
  const paginationButtons = ['first', 'prev', 'next', 'last'];

  const html = `
    <ul class="paginationLinks">
        ${paginationButtons
          .filter(item => parsedHeaderLinks[item] !== undefined)
          .map(item => `<li><button id="${item}">${item}</button></li>`)
          .join('')}
    </ul>
  `;

  paginationContainer.innerHTML = html;
};

/**
 * Removes pagination buttons from the UI
 *
 */
export const removePaginationButtons = () => {
  const paginationContainer = document.getElementById('paginationContainer');
  paginationContainer.innerHTML = '';
};

/**
 * Updates the search results displayed in the UI
 *
 * @param {Array} searchItems - search result items
 *
 */
export const updateSearchResults = searchItems => {
  const html = `
    <ul class="searchResults">
        ${searchItems
          .map(item => `<li><a href="${item.html_url}">${item.name}</a></li>`)
          .join('')}
    </ul>
  `;

  const searchResultsContainer = document.getElementById(
    'searchResultsContainer'
  );
  searchResultsContainer.innerHTML = html;
};

/**
 * Sets an error message to the UI
 *
 * @param {String} message - Error message to display to the user
 *
 */
export const setErrorMessage = message => {
  const errorMessageContainer = document.getElementById(
    'errorMessageContainer'
  );
  const content = `<strong>${message}</strong>`;
  errorMessageContainer.innerHTML = content;
};

/**
 * Sets an error message to the UI
 *
 * @param {Boolean} isLoading - Loading state of the page eg true = loading
 *
 */
export const setLoadingState = isLoading => {
  const loadingContainer = document.getElementById('loadingContainer');
  loadingContainer.innerHTML = isLoading ? '<p>Loading</p>' : '';
};
