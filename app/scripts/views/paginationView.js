import View from './View.js';
import icons from 'url:../../assets/icons.svg';

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
                <svg width="298" height="512" viewBox="0 0 298 511.93">
                    <use href="${icons}#icon-left"></use>
                </svg>
            </li>
        `;
	}

	_generateMarkupNextBtn(currentPage) {
		return `
            <li class="pagination-btn" data-goto="${currentPage + 1}">
				<svg width="298" height="512" viewBox="0 0 298 511.93">
                    <use href="${icons}#icon-right"></use>
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
