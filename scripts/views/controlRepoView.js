import View from './View.js';

class ControlRepoView extends View {
	_parentEl = document.querySelector('.repo-input-per-page');

	addHandlerControl(handler) {
		this._parentEl.addEventListener('change', event => {
			const numberInput = event.target.closest('input');
			if (!numberInput) return;

			handler(+numberInput.value);
		});
	}

	_generateMarkup() {
		return `
            <label for="perPage">Repos per page: </label>

            <input 
                type="number" 
                id="perPage" 
                value="${this._data.resultsPerPage}" 
                min="10" 
                max="100" 
            />
        `;
	}
}

export default new ControlRepoView();
