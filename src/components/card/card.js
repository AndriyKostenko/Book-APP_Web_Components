import { appState } from "../../appState.js";

export class Card extends HTMLElement {
	css = `

		.card {
			display: flex;
			flex-direction: column;
			border-radius: 8px;
			overflow: hidden;
		}
			
		.card__image {
			background: #B8B8B8;
			display: flex;
			padding-top: 10px;
			justify-content: center;
			align-items: start;
			height: 180px;
		}

		.card__info {
			display: flex;
			flex-direction: column;
			background: var(--black);
			color: var(--white);
			padding: 10px;
			min-height: 150px;
		}

		.card__id {
			font-weight: 300;
			font-size: 11px;
			line-height: 15px;
			margin-bottom: 3px;
		}

		.card__name {
			font-size: 15.39px;
			font-weight: 600;
			line-height: 110%;
			margin-bottom: 8px;
		}
		
		.card__footer {
			margin-top: auto;
			display: flex;
		}

		.button__add {
			border-radius: 6px;
			width: 36px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: none;
			border: 1px solid var(--white);
			cursor: pointer;
		}

		.button__active {
			background: var(--white);
		}

	`

	constructor(book) {
		super();

		this.attachShadow({mode: 'open'});
		this.book = book;
		this.appState = appState;

		// Bind 'this' to keep context
		this.handleClick = this.handleClick.bind(this);

	}

	connectedCallback() {
		this.render();

		// attaching event listenres
		this.button = this.shadowRoot.querySelector('button');
		this.button.addEventListener('click', this.handleClick)
	}

	disconnectedCallback() {
		// Clean up the event listener when the element is removed
		this.button.removeEventListener('click', this.handleClick);

		this.appState.removeObserver(this); // clean up
	}

	handleClick() {
		const existInFavorites = this.appState.favorites.find(book => book == this.book.id);

		// Toggle favorite status based on existence in favorites
		if (existInFavorites) {
			this.appState.removeFavorite(this.book.id);
		} else {
			this.appState.addFavorite(this.book.id);
		}
	}

	update() {
		this.render();
	}

	render() {
		const existInFaforites = this.appState.favorites.find(book => book == this.book.id)
		
		this.shadowRoot.innerHTML  =`
			<style>${this.css}</style>

			<div class="card">
				<div class="card__image">
					<img src="./static/book-clipart-download.png" alt="${this.book.title}" />
				</div>

				<div class="card__info">
					<div class="card__id">
						${this.book.id}
					</div>

					<div class="card__name">
						${this.book.title}
					</div>

					<div class="card__footer">
						<button class="button__add ${existInFaforites ? 'button__active' : ''}">
							${existInFaforites
								? '<img src="./static/favorite-black.svg" />'
								: '<img src="./static/favorite-white.svg" />'}
						</button>
					</div>
				</div>
			</div>
			
		`;
	}
}