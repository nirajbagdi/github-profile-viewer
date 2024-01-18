'use strict';

const ACCESS_TOKEN = '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';
const BASE_URL = 'https://api.github.com/users';
const GITHUB_USERNAME = 'nirajbagdi';
const TIMEOUT_SEC = 10;

const state = {
	user: null,
};

async function timeout(ms) {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error('Request timed out'));
		}, ms * 1000);
	});
}

async function AJAX(url) {
	try {
		const response = await Promise.race([
			fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${ACCESS_TOKEN}`,
				},
			}),
			timeout(TIMEOUT_SEC),
		]);

		const data = await response.json();

		if (!response.ok) throw new Error(`${response.status} - ${data.message}`);
		return data;
	} catch (error) {
		throw error.message;
	}
}

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

(async function () {
	try {
		const userData = await Promise.all([getUserData(), getReposData()]);
		const [user, repos] = userData;

		state.user = { ...user, repos };
	} catch (error) {
		console.log(error);
	}
})();
