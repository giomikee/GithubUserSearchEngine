/**
 * Created by @giomikee
 * More info: https://github.com/giomikee/
 */

const GITHUB_API_PREFIX = 'https://api.github.com/users/',
	AJAX_METHOD = 'GET',
	USERS_STORAGE = { notFoundUsernames: [] },
	SELECTORS = {
		hidden: 'hidden',
		tableBody: 'tbody',
		img: 'img',
		span: 'span',
		a: 'a',
		th: 'th',
		td: 'td',
		tr: 'tr',
		userNotFound: '#user_not_found',
		username: '#username',
		userInfo: '#user_info',
		avatar: '#avatar',
		login: '#login',
		name: '#name',
		bio: '#bio',
		repositoriesContainer: '#repositories_container',
		repositories: '#repositories',
		noRepositories: '#no_repositories',
		repoName: 'repo_name',
		repoInfo: 'repo_info',
		starIcon: 'star_icon',
		stargazers: 'stargazers',
		forkIcon: 'fork_icon',
		forks: 'forks'
	},
	GITHUB_ICONS_SRC = {
		star: 'images/star.png',
		fork: 'images/fork.png'
	};

export default {
	GITHUB_API_PREFIX,
	AJAX_METHOD,
	USERS_STORAGE,
	SELECTORS,
	GITHUB_ICONS_SRC
};
