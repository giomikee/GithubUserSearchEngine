/**
 * Created by @giomikee
 * More info: https://github.com/giomikee/
 */

/* eslint-disable no-magic-numbers */

import Constants from './Constants.js';

const { SELECTORS, USERS_STORAGE, GITHUB_ICONS_SRC } = Constants;
const HIDDEN_ACTION = {
	add: 'add',
	remove: 'remove'
};

const toggleHiddenClass = (element, toggleAction) => element.classList[toggleAction](SELECTORS.hidden);

const createElement = element => document.createElement(element);

const cleanElementChildren = element => {
	element.innerHTML = '';
};

const resetContainer = container => {
	const negativeResults = container.querySelectorAll(`${SELECTORS.noRepositories}, ${SELECTORS.userNotFound}`);
	const elements = [...container.children, ...negativeResults];

	elements.forEach(element => toggleHiddenClass(element, HIDDEN_ACTION.add));
};

const userNotFound = (username, resultContainer) => {
	const notFoundElement = resultContainer.querySelector(SELECTORS.userNotFound);
	const usernameSpan = notFoundElement.querySelector(SELECTORS.username);

	toggleHiddenClass(notFoundElement, HIDDEN_ACTION.remove);
	usernameSpan.textContent = username;

	USERS_STORAGE.notFoundUsernames.indexOf(username) === -1 && USERS_STORAGE.notFoundUsernames.push(username);
};

const printUserInfo = (user, userInfoTable) => {
	const avatar = userInfoTable.querySelector(SELECTORS.avatar),
		login = userInfoTable.querySelector(SELECTORS.login),
		name = userInfoTable.querySelector(SELECTORS.name),
		bio = userInfoTable.querySelector(SELECTORS.bio),
		userLink = Object.assign(createElement(SELECTORS.a), { target: '_blank' });

	toggleHiddenClass(userInfoTable, HIDDEN_ACTION.remove);
	cleanElementChildren(name);

	avatar.src = user.avatar_url;
	login.textContent = `@${user.login}`;
	bio.textContent = user.bio;
	userLink.href = user.html_url;
	userLink.textContent = user.name;

	name.appendChild(userLink);
};

const printRepositories = (user, repositoriesContainer) => {
	const reposTable = repositoriesContainer.querySelector(SELECTORS.repositories),
		tableBody = reposTable.querySelector(SELECTORS.tableBody);

	toggleHiddenClass(repositoriesContainer, HIDDEN_ACTION.remove);
	cleanElementChildren(tableBody);

	if (user.repositories.length === 0) {
		const noRepos = repositoriesContainer.querySelector(SELECTORS.noRepositories),
			username = noRepos.querySelector(SELECTORS.username);

		toggleHiddenClass(noRepos, HIDDEN_ACTION.remove);
		username.textContent = user.login;
	} else {
		toggleHiddenClass(reposTable, HIDDEN_ACTION.remove);

		user.repositories.forEach(repo => {
			const name = Object.assign(createElement(SELECTORS.th), { className: SELECTORS.repoName }),
				tableRow = createElement(SELECTORS.tr),
				repoLink = Object.assign(createElement(SELECTORS.a), { target: '_blank' }),
				info = Object.assign(createElement(SELECTORS.td), { className: SELECTORS.repoInfo }),
				starIcon = Object.assign(createElement(SELECTORS.img),
					{ className: SELECTORS.starIcon, src: GITHUB_ICONS_SRC.star }),
				stargazers = Object.assign(createElement(SELECTORS.span), { className: SELECTORS.stargazers }),
				forks = Object.assign(createElement(SELECTORS.span), { className: SELECTORS.forks }),
				forkIcon = Object.assign(createElement(SELECTORS.img),
					{ className: SELECTORS.forkIcon, src: GITHUB_ICONS_SRC.fork });

			repoLink.href = repo.html_url;
			repoLink.textContent = repo.name;
			name.appendChild(repoLink);

			stargazers.textContent = repo.stargazers_count;
			forks.textContent = repo.forks_count;
			info.appendChild(starIcon);
			info.appendChild(stargazers);
			info.appendChild(forkIcon);
			info.appendChild(forks);

			tableRow.appendChild(name);
			tableRow.appendChild(info);

			tableBody.appendChild(tableRow);
		});
	}
};

const printResult = (user, resultContainer) => {
	const userInfoTable = resultContainer.querySelector(SELECTORS.userInfo),
		repositoriesContainer = resultContainer.querySelector(SELECTORS.repositoriesContainer);

	printUserInfo(user, userInfoTable);
	printRepositories(user, repositoriesContainer);

	!USERS_STORAGE[user.login] && (USERS_STORAGE[user.login] = user);
};

export default {
	createElement,
	resetContainer,
	userNotFound,
	printResult
};
