import * as model from './model.js';

import profileView from './views/profileView.js';

async function controlProfile() {
	try {
		profileView.renderSpinner();

		await model.getProfileData();
		profileView.render(model.state.profile);
	} catch (error) {
		profileView.renderError(error);
	}
}

function init() {
	profileView.renderOn(controlProfile);
}

init();
