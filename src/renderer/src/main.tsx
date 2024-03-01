import "./assets/main.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import TabContainer from "./pages/TabContainer"
import GlobalSettings from "./pages/GlobalSettings"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":gameId",
        element: <TabContainer />
      },
      {
        path: "/settings",
        element: <GlobalSettings />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
