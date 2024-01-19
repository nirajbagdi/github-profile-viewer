import View from './View.js';

class RepoView extends View {
	_parentEl = document.querySelector('.repos');
	_errorMsg = 'No Repos Found';

	_generateMarkup() {
		const repoMarkup = repo =>
			`<article class="card repo">
                <header>
                    <h2 class="repo-title">
                        <a
                            href="${repo.htmlUrl}"
                            target="_blank"
                        >
                            ${repo.name}
                        </a>
                    </h2>
    
                    <p class="repo-description">
                        ${repo.description || 'This profile has no description'}
                    </p>
                </header>
    
                <div class="repo-tags flex">
                    ${repo.topics.map(topic => `<span>${topic}</span>`).join('')}
                </div>
            </article>`;

		return this._data.repos.map(repoMarkup).join('');
	}
}

export default new RepoView();
