/*******************************************************
 * Functions to update the User Interface
 *
 * This service provides functions for updating
 * the User Interface
 *
 *******************************************************/
import parseLinks from 'parse-link-header';
import { paginateSearchResults } from './api';

/**
 * Contstructs pagination section HTML
 *
 * @param {Object} paginationLinks - the parsed API response pagination header links
 *
 * @return {string} html of pagination links
 */
const constructPaginationHTML = parsedHeaderLinks => {
  // state the type of buttons and order we want them
  const paginationButtons = ['first', 'prev', 'next', 'last'];

  const html = `
    <ul class="paginationLinks">
        ${paginationButtons
          .filter(item => parsedHeaderLinks[item] !== undefined)
          .map(item => `<li><button id="${item}">${item}</button></li>`)
          .join('')}
    </ul>
  `;

  return html;
};

/**
 * Update the pagitation UI component based on API response
 * 1. Add eventListener to pagination container
 * 2. Add pagination html to the DOM
 *
 * @param {Object} paginationLinks - the API response pagination links
 *
 */
export const createPaginationButtons = paginationLinks => {
  const parsedHeaderLinks = parseLinks(paginationLinks);
  const paginationContainer = document.getElementById('paginationContainer');

  // 1. Attatch event handler to pagination container
  // We use event bubbling to determine which API endpoint we use when a
  // pagination button is clicked
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

  // add html to container
  const html = constructPaginationHTML(parsedHeaderLinks);
  paginationContainer.innerHTML = html;
};

/**
 * Remove pagination buttons from the DOM
 *
 */
export const removePaginationButtons = () => {
  const paginationContainer = document.getElementById('paginationContainer');
  paginationContainer.innerHTML = '';
};

/**
 * Helper function that determines what state to set the pagination links
 * Run this heper function whenever state is updated
 */
export const setPaginationUI = headerLinks => {
  if (headerLinks) {
    createPaginationButtons(headerLinks);
  } else {
    removePaginationButtons();
  }
};
