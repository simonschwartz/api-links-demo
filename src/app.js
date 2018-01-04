/*******************************************************
 * App entry point
 *
 * Simon Schwartz
 *******************************************************/
import { searchRepositories } from './api';

// Attatch event listener to the submit event on our search form
document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const searchValue = document.getElementById('searchInput').value;
  return searchRepositories(searchValue);
});
