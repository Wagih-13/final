import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LayOut from "./Component/LayOut/LayOut";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Login from "./Component/Login/Login";
import Products from "./Component/Products/Products.jsx";
import Categories from "./Component/Categories/Categories";
import Register from "./Component/Register/Register";
import NotFound from "./Component/NotFound/NotFound";
import ForgetPass from "./Component/ForgetPass/ForgetPass";
import { UserContextProvider } from "./Context/UserContext";
import GuradRouting from "./Component/GuradRouting/GuradRouting";
import ResetPassowrd from "./Component/ResetPassowrd/ResetPassowrd";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsDetails from "./Component/ProductsDetails/ProductsDetails.jsx";
import { CartContextProvider } from "./Context/CartContext.js";
import LoginChick from "./Component/LoginChick/LoginChick.jsx";
import Brands from "./Component/Brands/Brands.jsx";
import WishList from "./Component/WishList/WishList.jsx";
import { WishListContextProvider } from "./Context/WishListContext.js";

function App() {
  let queryClient = new QueryClient();
  let routers = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          path: "home",
          element: (
            <GuradRouting>
              <Home />
            </GuradRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <GuradRouting>
              <Cart />
            </GuradRouting>
          ),
        },
        {
          path: "categories",
          element: (
            <GuradRouting>
              <Categories />
            </GuradRouting>
          ),
        },
        {
          path: "Brands",
          element: (
            <GuradRouting>
              <Brands />
            </GuradRouting>
          ),
        },
        {
          path: "WishList",
          element: (
            <GuradRouting>
              <WishList />
            </GuradRouting>
          ),
        },
        {
          path: "ProductsDetails/:id",
          element: (
            <GuradRouting>
              <ProductsDetails />
            </GuradRouting>
          ),
        },
        {
          path: "Products/:id",
          element: (
            <GuradRouting>
              <Products />
            </GuradRouting>
          ),
        },
        {
          path: "login",
          element: (
            <LoginChick>
              <Login />
            </LoginChick>
          ),
        },
        {
          index: true,
          element: (
            <LoginChick>
              <Register />
            </LoginChick>
          ),
        },
        {
          path: "register",
          element: (
            <LoginChick>
              <Register />
            </LoginChick>
          ),
        },
        {
          path: "resetpassowrd",
          element: (
            <LoginChick>
              <ResetPassowrd />
            </LoginChick>
          ),
        },
        {
          path: "ForgetPass",
          element: (
            <LoginChick>
              <ForgetPass />
            </LoginChick>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WishListContextProvider>
          <CartContextProvider>
            <UserContextProvider>
              <RouterProvider router={routers} />
            </UserContextProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
