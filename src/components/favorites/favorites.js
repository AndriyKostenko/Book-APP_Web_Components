import {appState} from "../../appState.js";

export class Favorites extends HTMLElement {
	css = `
		.card_grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 30px;
			width: 100%; /* Ensure it stays within the container */
			box-sizing: border-box; /* Ensure padding/borders don't push it out */
		}
	`

	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.appState = appState;
		this.appState.addObserver(this)

	
	}


	connectedCallback() {
		this.render();

	}

	disconnectedCallback() {
		this.appState.removeObserver(this); // clean up
	}

	update() {
		this.render();
	}

	render() {
		// filter favorite books from the main book list
		const favoriteBooks = this.appState.books
			.flatMap(bookArray => bookArray)
			.filter(book => this.appState.favorites.includes(book.id)); // filtering
		
		if (favoriteBooks.length === 0) {
			this.shadowRoot.innerHTML = `
				<style>${this.css}</style>

				<h2>No favorite books yet</h2>
			`;
			return;
		}

		const cardListContainer = document.createElement('div');
		cardListContainer.classList.add('card_grid');

		// render favorite books as cards
		favoriteBooks.forEach(book => {
			const card = document.createElement('book-card');
			card.book = book; // Pass the book data to the card element
			cardListContainer.appendChild(card)
		})

		//clear the shadow DOM
		this.shadowRoot.innerHTML = `
			<style>${this.css}</style>

			<h2>Favorite Books</h2>
		`;
		this.shadowRoot.appendChild(cardListContainer);

	
	}



}