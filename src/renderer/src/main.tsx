import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createMemoryRouter } from "react-router"
import App from "./App"
import "./assets/main.css"
import GlobalSettings from "./pages/GlobalSettings"
import TabContainer from "./pages/TabContainer"

const router = createMemoryRouter([
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
