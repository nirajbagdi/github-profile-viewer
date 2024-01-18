import { ACCESS_TOKEN, TIMEOUT_SEC } from './config.js';

async function timeout(seconds) {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error('Request timed out'));
		}, seconds * 1000);
	});
}

export async function AJAX(url) {
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
