import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = require("./App").default;

const container = document.getElementById('root');
const root = createRoot(container);

const render = () => {
  root.render(<App />);
}

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render();
  });
}
