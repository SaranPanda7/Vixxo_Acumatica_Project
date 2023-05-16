import "./App.css";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Preloader from "./components/preloader/Preloader";
import PageNotFound from "./components/errorPage/PageNotFound";

function App() {
  const [user, setUser] = useState(() =>
    localStorage.getItem("access")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  const ProtectedRoute = ({ user, redirectPath = "/" }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  const AuthRoute = ({ user, redirectPath = "/dashboard" }) => {
    if (user) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="Logout" element={<Logout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          exact
          path="/load"
          element={
            <>
              <Preloader />
            </>
          }
        />
        <Route element={<AuthRoute user={user} />}>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
        </Route>
        <Route element={<ProtectedRoute user={user} />}>
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <Dashboard />
                <Footer />
              </>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
