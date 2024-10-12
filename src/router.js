// src/router.js
const routes = {
  '#/': 'home-component',
  '#/about': 'about-component',
  '#/contact': 'contact-component',
};

export function router() {
  const path = window.location.hash || '#/';  // Default to home if no hash is present
  const app = document.querySelector('#app');
  
  // Clear the content
  app.innerHTML = '';

  // Load the appropriate component based on the route
  const routeComponent = routes[path] || 'home-component'; // Default to home-component
  const componentElement = document.createElement(routeComponent);
  app.appendChild(componentElement);
}
