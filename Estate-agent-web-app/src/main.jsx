/* Entry point for the React application */

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom" 
import App from "./App.jsx" 
import "./index.css"

/* Render the main application component within a StrictMode and BrowserRouter */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);