import { appState } from "../../appState.js";

export class Header extends HTMLElement {
	css = `
		header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30px;
			margin-top: 20px;
		}
		
		.menu {
			display: flex;
			align-items: center;
			gap: 30px;
		}

		.menu__item {
			display: flex;
			align-items: center;
			gap: 10px;
			font-size: 14px;
			line-height: 20px;
			color: var(--black);
			text-decoration: none;
		}

		.menu__item::visited {
			color: var(--black)
		}

		.menu__counter {
			font-size: 12px;
			line-height: 28px;
			border: 1px solid var(--black);
			border-radius: 50%;
			padding: 0 10px;
		}
  `;

	constructor() {
        super();

        this.attachShadow({ mode: 'open' }); // Attaching shadow DOM
		this.appState = appState;
		
		// Each component that needs to react to changes in the state (like the Header component) registers itself as an observer
		this.appState.addObserver(this);
		
	}

	//initial render
	connectedCallback() {
		this.render(); 
	}

	disconnectedCallback() {
		this.appState.removeObserver(this); // clean up
	}

	// this method is called when state changes
	update() {
		this.render();
	}

	render() {
		// This is where we render the component
		this.shadowRoot.innerHTML = `
			<style>${this.css}</style>

			<header>
				<div>
					<img src="./static/logo.svg" alt="logo_icon"></img>
				</div>

				<div class="menu">
					<a class="menu__item" href="#">
						<img src="./static/search.svg" alt="searcr_icon"></img>
						Book Search
					</a>

					<a class="menu__item" href="#favorites">
						<img src="./static/favorites.svg" alt="favourites_icon"></img>
						Favourites books

						<div class="menu__counter">
							${this.appState.favorites.length}
						</div>
					</a>
				</div>
			</header>

			<slot name="header"></slot>	`;
	}

}


