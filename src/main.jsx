import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./redux-store/appStore.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AddPost from "./pages/AddPost.jsx"
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AuthVaidation from "./AuthVaidation.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/login",
        element: (
          <AuthVaidation authentication={false}>
            <LoginPage />
          </AuthVaidation>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthVaidation authentication={false}>
            <SignupPage />
          </AuthVaidation>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthVaidation authentication>
            <EditPost />
          </AuthVaidation>
        ),
      },
      {
        path: "/addpost",
        element: (
          <AuthVaidation authentication>
            <AddPost />
          </AuthVaidation>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
