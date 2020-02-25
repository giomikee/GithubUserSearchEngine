/**
 * Created by @giomikee
 * More info: https://github.com/giomikee/
 */

import SearchEngineUtils from './SearchEngineUtils.js';

const SEARCH_FORM = document.querySelector('#search_user');
const RESULT_CONTAINER = document.querySelector('#result');
const { searchUser } = SearchEngineUtils;

SEARCH_FORM.addEventListener('submit', event => {
	event.preventDefault();

	const searchOptions = {
		username: event.target.username.value,
		resultContainer: RESULT_CONTAINER
	};

	searchUser(searchOptions);
});
