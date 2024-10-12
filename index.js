'use strict';

import { router } from './src/router.js';
import { Header } from "./src/components/header/header.js";


// Initial load
window.addEventListener('DOMContentLoaded', router);

// Handle hashchange to update the route
window.addEventListener('hashchange', router);


window.customElements.define('header-component', Header);
