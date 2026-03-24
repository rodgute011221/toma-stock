import { createBrowserRouter } from "react-router";
import Home from "../page/Home/Home";
import Product from "../page/Product/Product";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/product",
        element: <Product />
    }
])