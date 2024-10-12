export class Header extends HTMLElement {
	css = `
		header {
			background-color: #f0f0f0;
			padding: 1rem;
			text-align: center;
		}
		h1 {
			color: #333;
		}
  `;

	constructor(appState) {
        super();

		this.appState = appState
        this.attachShadow({ mode: 'open' }); // Attach shadow DOM
		
	}

	connectedCallback() {
		// This is where we render the component
		this.shadowRoot.innerHTML = `
			<style>${this.css}</style>

			<header>
				<div>
					<img src="./static/logo.svg" alt="logo_icon"></img>
				</div>

				<div class="menu">
					<a class="menu_item" href="#">
						<img src="./static/search.svg" alt="searcr_icon"></img>
						Book Search
					</a>

					<a class="menu_item" href="#">
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


