import NewMaterial from "./components/Materials/NewMaterial";
import NewOrder from "./components/NewOrderForm/NewOrder";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import OrderPage from "./pages/Order/OrderPage";
import Orders from "./pages/Order/Orders";
import Profile from "./pages/Profile";
import NewProjectPage from "./pages/Project/NewProjectPage";
import ProjectPage from "./pages/Project/ProjectPage";
import Projects from "./pages/Project/Projects";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  NEW_MATERIAL_ROUTE,
  NEW_ORDER_ROUTE,
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
    path: ORDERPAGE_ROUTE + '/:id',
    Component: OrderPage,
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
    path: NEW_PROJECT_ROUTE,
    Component: NewProjectPage
  },
  {
    path: NEW_ORDER_ROUTE,
    Component: NewOrder
  },
  {
    path: PROJECT_PAGE_ROUTE + '/:id',
    Component: ProjectPage,
  },
  {
    path: NEW_MATERIAL_ROUTE,
    Component: NewMaterial,
  }
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
