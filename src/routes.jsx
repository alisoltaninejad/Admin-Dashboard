import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import NewUser from "./pages/NewUser/Newuser";
import Accessibility from "./pages/Accessibility/Accessibility";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Inventory from "./pages/Inventory/Inventory";
import Pages from "./pages/Pages/Pages";
import Blogs from "./pages/Blogs/Blogs";
import SystemSetting from "./pages/SystemSetting/SystemSetting";
import AccountSetting from "./pages/AccountSetting/AccountSetting";
import EditProfile from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";

let routes = [
  { path: "/", element: <Home /> },
  { path: "/Users", element: <Users /> },
  { path: "/NewUser", element: <NewUser /> },
  { path: "/Accessibility", element: <Accessibility /> },
  { path: "/Products", element: <Products /> },
  { path: "/Categories", element: <Categories /> },
  { path: "/Inventory", element: <Inventory /> },
  { path: "/Pages", element: <Pages /> },
  { path: "/Blogs", element: <Blogs /> },
  { path: "/SystemSetting", element: <SystemSetting /> },
  { path: "/AccountSetting", element: <AccountSetting /> },
  { path: "/EditProfile", element: <EditProfile /> },
  { path: "/Login", element: <Login /> },
];

export default routes;
