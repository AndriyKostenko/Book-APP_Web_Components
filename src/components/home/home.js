export class Home extends HTMLElement {

	connectedCallback() {
		this.render();
	}

    render() {
		this.innerHTML = `
		<search-component></search-component>
		<card-list-component></card-list-component>
		`;
    }
}