import icons from 'url:../../assets/icons.svg';

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
		const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;

		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	renderError(errorMsg) {
		const markup = `
            <div class="error flex">
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                ${this._errorMsg || errorMsg}
            </div>
        `;

		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	_clear() {
		this._parentEl.innerHTML = '';
	}
}
