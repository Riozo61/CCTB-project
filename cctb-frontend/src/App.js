import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import AppDrawer from "./components/AppDrawer";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppDrawer/>
      <AppRouter />
    </BrowserRouter>
  );
}
