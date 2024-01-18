import View from './View.js';

class RepoView extends View {
	_parentEl = document.querySelector('.profile-repos');
	_errorMsg = 'No Repos Found';

	_generateMarkup() {
		const repoMarkup = repo =>
			`<div class="card profile-repo">
                <header>
                    <a
                        class="profile-repo--title"
                        href="${repo.htmlUrl}"
                        target="_blank"
                    >
                        ${repo.name}
                    </a>
    
                    <p class="profile-repo--description">
                        ${repo.description || 'This profile has no description'}
                    </p>
                </header>
    
                <div class="profile-repo--tags flex">
                    ${repo.topics.map(topic => `<span>${topic}</span>`).join('')}
                </div>
            </div>`;

		return this._data.repos.map(repoMarkup).join('');
	}
}

export default new RepoView();
