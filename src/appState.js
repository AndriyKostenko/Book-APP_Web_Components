class AppState {
	constructor() {
		this.favorites = [];
		this.selectedBooks = 0;
		this.observers = [] // List of observers (components) watching for state changes
	}

	//method to register a new observer (component)
	addObserver(observer) {
		this.observers.push(observer)
	}

	//notify all observers of state changes...so in each observer method update() will be called
	notifyObservers() {
		this.observers.forEach(observer => observer.update());
	}

	// add a fevorite book
	addFavorite(book) {
		this.addFavorite.push(book);
		this.notifyObservers();  // Notify components that the state has changed

	}

	//remove favorite book
	removeFavorite(book) {
		this.favorites = this.favorites.filter(fav => fav !== book);
		this.notifyObservers() // Notify components that the state has changed
	}

	selectBook() {
		this.selectedBooks++;
		this.notifyObservers()
	}

	deleteBook(){
		if (this.selectedBooks > 0) {
			this.selectedBooks--;
			this.notifyObservers()
		}
	}
}

export const appState = new AppState();