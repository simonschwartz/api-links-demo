import { searchRepositories } from './api';

/*
 * Attatch onSubmit event handler to the search form
 */
const attatchSubmitEvent = () => {
  document.getElementById('searchForm').addEventListener('submit', event => {
    event.preventDefault();
    const searchValue = document.getElementById('searchInput').value;
    return searchRepositories(searchValue).catch(error => {
      // throw UI error here
      // const theDiv = document.getElementById('searchResults');
      // const content = `<p>Sorry that request didn't work - Please try again</p>`;
      // theDiv.innerHTML = content;
    });
  });
};

attatchSubmitEvent();
