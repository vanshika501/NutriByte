import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "../src/alayout.jsx";
import {
  BrowserRouter as BS,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MealForm from "./components/mealForm.jsx";
import Recipe from "./components/Recipe.jsx";
import Navbar from "./components/navbar.jsx";
import Firstpage from './components/firstpage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Firstpage />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/mealForm" element={<MealForm />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);
