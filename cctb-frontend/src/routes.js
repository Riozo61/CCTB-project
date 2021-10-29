import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NewOrder from "./pages/NewOrder";

import OrderPage from "./pages/OrderPage";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ProjectPage from "./pages/ProjectPage";
import Projects from "./pages/Projects";
import {
  ADMIN_ROUTE,
  CREATE_NEW_ORDER_ROUTE,
  LOGIN_ROUTE,
  NEW_PROJECT_ROUTE,
  ORDERPAGE_ROUTE,
  ORDERS_ROUTE,
  PROFILE_ROUTE,
  PROJECTS_ROUTE,
  PROJECT_PAGE_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: ORDERS_ROUTE,
    Component: Orders,
  },
  {
    path: ORDERPAGE_ROUTE + "/:id",
    Component: OrderPage,
  },
  {
    path: CREATE_NEW_ORDER_ROUTE,
    Component: NewOrder,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: PROJECTS_ROUTE,
    Component: Projects,
  },
  {
    path: PROJECT_PAGE_ROUTE,
    Component: ProjectPage,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
