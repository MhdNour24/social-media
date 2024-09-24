import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import { themeSettings } from "./theme";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/"
            element={isAuth ? <Navigate to={"/home"} /> : <LoginPage />}
            // element={<LoginPage />}
          ></Route>
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to={"/"}></Navigate>}
            // element={<HomePage />}
          ></Route>
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to={"/"}></Navigate>}
          ></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
