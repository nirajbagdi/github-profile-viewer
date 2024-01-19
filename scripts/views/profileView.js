import icons from '../../img/icons.svg';
import View from './View.js';

class ProfileView extends View {
	_parentEl = document.querySelector('.profile');
	_errorMsg = 'Profile not found';

	addHandlerRender(handler) {
		window.addEventListener('load', handler);
	}

	// prettier-ignore
	_generateLinksMarkup() {
		const profileLinks = [
            { id: 'icon-location', url: '', text: this._data.location, fallback: 'Not available' },
            { id: 'icon-twitter', url: `https://x.com/${this._data.twitter}`, text: this._data.twitter, fallback: 'Not available' },
            { id: 'icon-blog', url: this._data.blog, text: this._data.blog, fallback: 'Not available' },
            { id: 'icon-company', url: `https://${this._data.company}`, text: this._data.company, fallback: 'Not available' },
        ];

		return `
            <div class="profile-links">
                ${profileLinks.map(link => (
                    `<div class="flex profile-link-item ${!link.text ? 'text-muted' : ''}">
                        <svg id="${link.id}" xmlns="http://www.w3.org/2000/svg">
                            <use href="${icons}#${link.id}"></use>
                        </svg>

                        ${!link.text || !link.url
                            ? `<a>${link.text || link.fallback}</a>`
                            : `<a href="${link.url}" target="_blank">${link.text || link.fallback}</a>`
                        }
                    </div>`
                )).join('')}
            </div>
        `;
	}

	_generateMarkup() {
		return `
            <div class="profile-img-col">
                <img
                    src="${this._data.avatarUrl}"
                    alt="${this._data.username}"
                />
            </div>

            <div class="profile-info-col">
				<p class="profile-title">${this._data.name}</p>

				<a
					class="profile-username"
					href="${this._data.htmlUrl}"
					target="_blank"
				>
					@${this._data.username}</a
				>

				<p class="profile-bio">
                    ${this._data.bio || 'This profile has no bio'}
                </p>

                ${this._generateLinksMarkup()}
			</div>
        `;
	}
}

export default new ProfileView();
