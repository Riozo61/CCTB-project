import NewMaterial from "./components/Materials/NewMaterial";
import NewOrder from "./components/NewOrderForm/NewOrder";
import NewMember from "./components/Team/NewMember";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Costs from "./pages/Costs/Costs";
import OrderPage from "./pages/Order/OrderPage";
import Orders from "./pages/Order/Orders";
import Profile from "./pages/Profile";
import NewProjectPage from "./pages/Project/NewProjectPage";
import ProjectPage from "./pages/Project/ProjectPage";
import Projects from "./pages/Project/Projects";
import Team from "./pages/Team/Team";
import {
  ADMIN_ROUTE,
  COSTS_ROUTE,
  LOGIN_ROUTE,
  NEW_COSTS_ROUTE,
  NEW_MATERIAL_ROUTE,
  NEW_MEMBER_ROUTE,
  NEW_ORDER_ROUTE,
  NEW_PROJECT_ROUTE,
  ORDERPAGE_ROUTE,
  ORDERS_ROUTE,
  PROFILE_ROUTE,
  PROJECTS_ROUTE,
  PROJECT_PAGE_ROUTE,
  REGISTRATION_ROUTE,
  TEAM_ROUTE,
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
  },
  {
    path: TEAM_ROUTE,
    Component: Team
  },
  {
    path: NEW_MEMBER_ROUTE,
    Component: NewMember
  },
  {
    path: COSTS_ROUTE,
    Component: Costs
  },
  {
    path: NEW_COSTS_ROUTE,
    Component: Costs
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
