class AppState {
	constructor() {
		this.searchQuery = '';
		this.favorites = [];
		this.selectedBooks = 0;
		this.observers = [] // List of observers (components) watching for state changes
		this.books = [];
		this.loading = false;
		this.error = null;
	}

	// Setter for searchQuery that triggers book loading when changed
	set searchQuery(value) {
		// Update the internal storage of the search query
		this._searchQuery = value;

		this.loadBooks(value, 0) // Load books every time searchQuery changes
	}

	get searchQuery() {
		// Return the internal value of the search query
		return this._searchQuery;
	}


	//method to register a new observer (component)
	addObserver(observer) {
		this.observers.push(observer)
	}

	// Method to remove an observer
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

	//notify all observers of state changes...so in each observer method update() will be called
	notifyObservers() {
		this.observers.forEach(observer => observer.update());
	}

	//load books
	async loadBooks(query) {
		console.log(query)
		if (!query) return;

		this.loading = true;
		this.error = null;

		try {
			const response = await fetch(`https://api.bigbookapi.com/search-books?api-key=6e06e601c9684128a414ea8e0bdb988d&query=${query}.`);
			const data = await response.json()
			
			this.books = [...data.books]
			console.log(this.books)
			
		} catch (error) {
			this.error = 'Failed to fetch data'
			this.books = []
			console.error(error)
		} finally {
			this.loading = false;
			this.notifyObservers()
		}

	}

	// add a fevorite book
	addFavorite(bookId) {
		this.favorites.push(bookId);
		this.notifyObservers();  // Notify components that the state has changed
		console.log(this.favorites)

	}

	//remove favorite book
	removeFavorite(bookId) {
		this.favorites = this.favorites.filter(fav => fav !== bookId);
		this.notifyObservers() // Notify components that the state has changed
		console.log(this.favorites)
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