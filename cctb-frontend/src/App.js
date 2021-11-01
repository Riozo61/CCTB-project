import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import AppDrawer from "./components/AppDrawer";
import { observer } from "mobx-react-lite";
// import { useContext, useEffect, useState } from "react";
// import { Context } from "./index";
// import { check } from "./http/userAPI";
// import { ThemeProvider } from "@mui/system";
// import { createTheme } from '@material-ui/core';

// const theme = createTheme({
//   palette: {
//     primary: { main: '#1b618c' },
//     secondary: { main: '#bdbdbd' },
//   },
// });

const App = observer ( () => {
  // const {user} = useContext(Context);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   check().then(data => {
  //     user.setUser(true)
  //   })
  //   return () => {
      
  //   }
  // }, [input])
  return (
    <BrowserRouter>
    {/* <ThemeProvider theme={theme}> */}
      <NavBar />
      <AppDrawer/>
      <AppRouter />
    {/* </ThemeProvider> */}
    </BrowserRouter>

  )
}
)

export default App;
