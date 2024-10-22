'use strict';

import { router } from "./src/router.js";
import { Header } from "./src/components/header/header.js";
import { Search } from "./src/components/search/search.js";
import { CardList } from "./src/components/card-list/card-list.js";
import { Card } from "./src/components/card/card.js";
import { Home } from "./src/components/home/home.js";
import { Favorites } from "./src/components/favorites/favorites.js";


window.customElements.define('header-component', Header);
window.customElements.define('search-component', Search);
window.customElements.define('card-list-component', CardList);
window.customElements.define('book-card', Card);
window.customElements.define('home-component', Home);
window.customElements.define('favorites-component', Favorites)


// Initial load
window.addEventListener('DOMContentLoaded', router);

// Handle hashchange to update the route
window.addEventListener('hashchange', router);



