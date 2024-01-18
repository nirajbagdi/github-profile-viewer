import { BASE_URL, GITHUB_USERNAME } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
	profile: null,
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

async function getReposData() {
	try {
		const data = await AJAX(`${BASE_URL}/${GITHUB_USERNAME}/repos`);

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

export async function getProfileData() {
	try {
		const userData = await Promise.all([getUserData(), getReposData()]);
		const [user, repos] = userData;

		state.profile = { ...user, repos };
	} catch (error) {
		throw error;
	}
}
