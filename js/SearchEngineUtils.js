/**
 * Created by @giomikee
 * More info: https://github.com/giomikee/
 */

/* eslint-disable no-magic-numbers */

import User from './User.js';
import Constants from './Constants.js';
import AJAXUtils from './AJAXUtils.js';
import DOMUtils from './DOMUtils.js';

const { GITHUB_API_PREFIX, USERS_STORAGE } = Constants,
	{ ajaxRequest } = AJAXUtils,
	{ userNotFound, printResult, resetContainer } = DOMUtils;

const parseRepositoriesJson = repositoriesJson => JSON.parse(repositoriesJson);

const searchRepositoriesCallback = (user, response, resultContainer) => {

	user.repositories.push(...parseRepositoriesJson(response));
	printResult(user, resultContainer);
};

const searchUserCallback = (response, resultContainer, usernameIfNotFound) => {
	const user = response ? User.buildFromJSON(response) : null;

	if (user) {
		ajaxRequest(user.repos_url, repoResponse => searchRepositoriesCallback(user, repoResponse, resultContainer));
	} else {
		userNotFound(usernameIfNotFound, resultContainer);
	}
};

const searchUser = searchOptions => {

	const { username, resultContainer } = searchOptions;

	resetContainer(resultContainer);

	if (USERS_STORAGE[username]) {
		printResult(USERS_STORAGE[username], resultContainer);
	} else if (USERS_STORAGE.notFoundUsernames.indexOf(username) >= 0) {
		userNotFound(username, resultContainer);
	} else {
		ajaxRequest(
			`${GITHUB_API_PREFIX}${username}`,
			response => searchUserCallback(response, resultContainer, username));
	}
};

export default {
	searchUser
};
