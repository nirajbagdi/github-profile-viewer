import * as model from './model.js';

import profileView from './views/profileView.js';
import repoView from './views/repoView.js';

async function controlProfile() {
	try {
		profileView.renderSpinner();
		repoView.renderSpinner();

		await model.getProfileData();

		profileView.render(model.state.profile);
		repoView.render(model.state.profile);

		console.log(model.state.profile);
	} catch (error) {
		profileView.renderError(error);
		repoView.renderError(error);
	}
}

function init() {
	profileView.renderOn(controlProfile);
}

init();
