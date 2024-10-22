import { appState } from "../../appState.js"


export class Search extends HTMLElement {
	
	css = `
		.search {
			display: flex;
			width: 100%;
			gap: 10px;
			margin-bottom: 30px;
		}

		.search__wrapper {
			position: relative;
			flex: 1;
			display: flex;
		}

		.search__wrapper img {
			position: absolute;
			left: 10px;
			top: 12px;
		}

		.search__input {
			background: #DEDEDE;
			border: none;
			border-radius: 5px;
			color: #252525;
			padding: 15px 30px 15px 50px;
			flex: 1;
		}

		.search__input::placeholder {
			color: #494949;
		}

		.search button {
			border: none;
			background: var(--black);
			align-items: center;
			border-radius: 5px;
			display: flex;
			justify-content: center;
			cursor: pointer;
		}
	`

	constructor() {
		super();

		// Attaching shadow DOM
		this.attachShadow({ mode: 'open' }); 
		this.appState = appState;

		// Bind event handlers to keep 'this' context
		this.handleInputSubmit = this.handleInputSubmit.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	

	// Event handler to update appState when the user presses Enter or clicks the button
	handleInputSubmit() {
		const input = this.shadowRoot.querySelector('.search__input');
		if (input) {
			this.appState.searchQuery = input.value; // Set the searchQuery in the appState
			this.appState.notifyObservers(); // Notify observers of the change
		}
	}

	handleKeyDown(event) {
		if (event.key === 'Enter') {
			this.handleInputSubmit();
		}
	}


	//initial render
	connectedCallback() {
		this.render();

		// Add event listener for the button click or 'Enter'
		this.button = this.shadowRoot.querySelector('button');
		this.input = this.shadowRoot.querySelector('.search__input');

		this.button.addEventListener('click', this.handleInputSubmit);
		this.input.addEventListener('keydown', this.handleKeyDown);
	}

	// Remove event listeners when the component is removed from the DOM
	disconnectedCallback() {
		this.button.removeEventListener('click', this.handleInputSubmit);
		this.input.removeEventListener('keydown', this.handleKeyDown);

		this.appState.removeObserver(this); // clean up
	}

	// Called whenever the state changes
	update() {
		//update only the input field value instead of re-rendering every time
		const input = this.shadowRoot.querySelector(".search__input");
		console.log(input.value)
		if (input) {
			input.value = this.appState.searchQuery || ''; // Update the value
		}	
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>${this.css}</style>

			<div class="search">
				<div class="search__wrapper">
					<input type="text" 
							placeholder="Search the author's book..." 
							class="search__input"
							value="${this.appState.searchQuery || ''}"
							 
					/>
					<img src="/static/search.svg" alt="search icon"/>
				</div>
				<button>
					<img src="/static/search_white.svg" alt="search icon"/>
				</button>
			</div>

			
		`
	}


}