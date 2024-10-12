export class AppState {
	constructor() {
		this.favorites = [];
		this.selectedBooks = 0;
		this.observers = [] // List of observers (components) watching for state changes
	}

	//method to register a new observer (component)
	addObserver(observer) {
		this.observers.push(observer)
	}

	//notify all observers of state changes
	notifyObservers() {
		this.observers.forEach(observer => observer.update());
	}
}