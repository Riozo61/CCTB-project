import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import AppDrawer from "./components/AppDrawer";
// import { ThemeProvider } from "@mui/system";
// import { createTheme } from '@material-ui/core';

// const theme = createTheme({
//   palette: {
//     primary: { main: '#1b618c' },
//     secondary: { main: '#bdbdbd' },
//   },
// });

export default function App() {
  return (
    <BrowserRouter>
    {/* <ThemeProvider theme={theme}> */}
      <NavBar />
      <AppDrawer/>
      <AppRouter />
    {/* </ThemeProvider> */}
    </BrowserRouter>

  );
}
