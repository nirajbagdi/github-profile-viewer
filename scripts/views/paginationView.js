import View from './View.js';

class PaginationView extends View {
	_parentEl = document.querySelector('.pagination');

	addHandlerClick(handler) {
		this._parentEl.addEventListener('click', event => {
			const targetBtn = event.target.closest('li');
			if (!targetBtn || !targetBtn.dataset.goto) return;

			handler(+targetBtn.dataset.goto);
		});
	}

	_generateMarkupPrevBtn(currentPage) {
		return `
            <li class="pagination-btn" data-goto="${currentPage - 1}">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xml:space="preserve"
                    width="298"
                    height="512"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 298 511.93"
                >
                    <path
                        fill-rule="nonzero"
                        d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"
                    />
                </svg>
            </li>
        `;
	}

	_generateMarkupNextBtn(currentPage) {
		return `
            <li class="pagination-btn" data-goto="${currentPage + 1}">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					width="298"
					height="512"
					shape-rendering="geometricPrecision"
					text-rendering="geometricPrecision"
					image-rendering="optimizeQuality"
					fill-rule="evenodd"
					clip-rule="evenodd"
					viewBox="0 0 298 511.93"
				>
					<path
						fill-rule="nonzero"
						d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"
					/>
				</svg>
			</li>
        `;
	}

	_generateMarkup() {
		const currentPage = this._data.pageNum;

		return `
		    <div class="card">
		        <ul class="pagination-list">
		            ${currentPage !== 1 ? this._generateMarkupPrevBtn(currentPage) : ''}

                    ${currentPage !== 1 ? `<li class="pagination-number" data-goto="1">1</li>` : ''}

                    ${currentPage > 2 ? `<li class="pagination-number">...</li>` : ''}

                    ${
						currentPage > 2
							? `<li class="pagination-number" data-goto="${currentPage - 1}">
                                    ${currentPage - 1}
                                </li>`
							: ''
					}

                    <li class="pagination-number active">${currentPage}</li>

                    ${
						this._data.hasNextPage
							? `<li class="pagination-number" data-goto="${currentPage + 1}">
                                    ${currentPage + 1}
                                </li>`
							: ''
					}

		            ${this._data.hasNextPage ? this._generateMarkupNextBtn(currentPage) : ''}
		        </ul>
		    </div>
		`;
	}
}

export default new PaginationView();
