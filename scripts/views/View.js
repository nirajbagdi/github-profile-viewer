export default class View {
	_data;

	render(data) {
		if (!data) return this.renderError();

		this._data = data;
		const markup = this._generateMarkup();

		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	renderSpinner() {
		const markup = `<div class="spinner">Loading...</div>`;

		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	renderError(errorMsg = 'Something went wrong') {
		const markup = `<div class="error">${errorMsg}</div>`;

		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	_clear() {
		this._parentEl.innerHTML = '';
	}
}
