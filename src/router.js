// src/router.js
const routes = {
  '#/': 'home-component',
  '#/favorites': 'favorites-component',
};

export function router() {
  let path = window.location.hash || '#/';  // Default to home if no hash is present
  
  // Normalize the path to always start with `#/`
  if (path[1] !== '/') {
    path = '#/' + path.slice(1);
  }

  const app = document.querySelector('#app');
  
  // Clear the content
  app.innerHTML = '';

  // Load the appropriate component based on the route
  const routeComponent = routes[path] || 'home-component'; // Default to home-component
  console.log("Navigated to:", path, "Loading component:", routeComponent);

  const componentElement = document.createElement(routeComponent);
  app.appendChild(componentElement);
}
