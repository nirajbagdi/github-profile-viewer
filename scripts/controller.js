import * as model from './model.js';

import profileView from './views/profileView.js';
import repoView from './views/repoView.js';
import paginationView from './views/paginationView.js';

async function controlProfile() {
	try {
		profileView.renderSpinner();
		repoView.renderSpinner();

		await model.getProfileData();

		profileView.render(model.state.profile);
		repoView.render(model.state.profile);

		paginationView.render(model.state.page);
	} catch (error) {
		profileView.renderError(error);
		repoView.renderError(error);
	}
}

async function controlPagination(pageNum) {
	await model.getProfileData(pageNum);

	repoView.render(model.state.profile);
	paginationView.render(model.state.page);
}

function init() {
	profileView.addHandlerRender(controlProfile);
	paginationView.addHandlerClick(controlPagination);
}

init();
