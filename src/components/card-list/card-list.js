
import { appState } from "../../appState.js";

export class CardList extends HTMLElement {
	css = `
		.card_grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 30px;
			width: 100%; /* Ensure it stays within the container */
			box-sizing: border-box; /* Ensure padding/borders don't push it out */
		}

		.card_list__loader {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 16px;
			padding: 30px;
		}

	`

	constructor() {
		super();

		// Attaching shadow DOM
		this.attachShadow({ mode: 'open' }); 
		this.appState = appState;

		// Register this component as an observer of appState
		this.appState.addObserver(this)
	}

	connectedCallback() {
		this.render()
	}

	disconnectedCallback() {
		this.appState.removeObserver(this); // clean up
	}

	update() {
		this.render()
	}

	render() {
		if (this.appState.loading) {
			this.shadowRoot.innerHTML = `
				<style>${this.css}</style>

				<div class="card_list__loader">Loading....</div>
			`;
			return this.shadowRoot.innerHTML;
		}

		// Create a container for the card list
		const cardListContainer = document.createElement('div');
		cardListContainer.classList.add('card_grid')

		// Render the cards
		this.appState.books.forEach(bookArray => {
			const book = bookArray[0]; // Get the book object
			const card = document.createElement('book-card'); // Use 'book-card' (custom element name)
			card.book = book; // Set the book data to the card instance
			cardListContainer.appendChild(card); // Append the Card instance to the container
		});

		// Clear existing inner HTML and set new content
		this.shadowRoot.innerHTML = `
			<style>${this.css}</style>
			<h1>Found: ${this.appState.books.length} books</h1>
		`;

		// Append the card list container to the shadow DOM
		this.shadowRoot.appendChild(cardListContainer);

		
	}
}