

import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { Networks } from "./pages/networks";
import { RoutePrivate } from "./route/routeprivate";
import { Found } from "./pages/found";



const router = createBrowserRouter([

  {
    path:'/',
    element:<Home/>
  },

  {
    path:'/login',
    element:<Login/>
  },

  {
    path:'/admin',
    element:<RoutePrivate><Admin /></RoutePrivate> 
  },

  {
    path:'/admin/networks',
    element:<Networks />
  },

  {
    path:'*',
    element:<Found />
  },
])

export {router}