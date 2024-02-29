import "./assets/main.css"

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { RouterProvider } from "react-router"
import Dashboard from "./components/TabContainer"
import { Navigate, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":gameId",
        element: <Dashboard />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
