import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import "./index.css"

document.body.classList.add("bg-gray-900", "text-white")

const root = document.createElement("div")
document.body.appendChild(root)

const rootDiv = ReactDOM.createRoot(root)
rootDiv.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
