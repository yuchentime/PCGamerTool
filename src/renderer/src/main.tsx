import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import "./assets/main.css"
import GlobalSettings from "./pages/GlobalSettings"
import TabContainer from "./pages/TabContainer"

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
