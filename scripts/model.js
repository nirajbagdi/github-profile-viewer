import { BASE_URL, GITHUB_USERNAME, RESULTS_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
	profile: null,

	page: {
		pageNum: 1,
		hasNextPage: true,
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

async function getReposData(pageNum) {
	try {
		const data = await AJAX(
			`${BASE_URL}/${GITHUB_USERNAME}/repos?page=${pageNum}&per_page=${RESULTS_PER_PAGE}`
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

export async function getProfileData(pageNum = 1) {
	try {
		const userData = await Promise.all([getUserData(), getReposData(pageNum)]);
		const [user, repos] = userData;

		const nextRepos = await getReposData(pageNum + 1);
		const hasNextPage = nextRepos.length !== 0;

		state.profile = { ...user, repos };
		state.page = { pageNum, hasNextPage };
	} catch (error) {
		throw error;
	}
}
