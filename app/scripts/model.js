import { BASE_URL, GITHUB_USERNAME, RESULTS_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
	profile: null,

	page: {
		pageNum: 1,
		hasNextPage: true,
		resultsPerPage: RESULTS_PER_PAGE,
	},
};

async function getUserData() {
	try {
		const data = await AJAX(`${BASE_URL}/${GITHUB_USERNAME}`);

		const normalizedData = {
			id: data.id,
			name: data.name,
			username: data.login,
			bio: data.bio,
			htmlUrl: data.html_url,
			avatarUrl: data.avatar_url,
			location: data.location,
			company: data.company,
			blog: data.blog,
			twitter: data.twitter_username,
		};

		return normalizedData;
	} catch (error) {
		throw error;
	}
}

async function getReposData(pageNum, reposPerPage) {
	try {
		const data = await AJAX(
			`${BASE_URL}/${GITHUB_USERNAME}/repos?page=${pageNum}&per_page=${reposPerPage}`
		);

		const normalizedData = data.map(repo => ({
			id: repo.id,
			name: repo.name,
			description: repo.description,
			htmlUrl: repo.html_url,
			topics: repo.topics,
		}));

		return normalizedData;
	} catch (error) {
		throw error;
	}
}

export async function getProfileData(
	pageNum = state.page.pageNum,
	reposPerPage = state.page.resultsPerPage
) {
	try {
		const userData = await Promise.all([getUserData(), getReposData(pageNum, reposPerPage)]);
		const [user, repos] = userData;

		const nextRepos = await getReposData(pageNum + 1, reposPerPage);
		const hasNextPage = nextRepos.length !== 0;

		state.profile = { ...user, repos };
		state.page = { pageNum, hasNextPage, resultsPerPage: reposPerPage };
	} catch (error) {
		throw error;
	}
}
