import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import ProtectedRoute from "./ProtectedRoute";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const user = useSelector((s) => s.auth.user);

  return (
    <Router>
      <AccessibleNavigationAnnouncer />
      <Suspense fallback={<div>Loading…</div>}>
        <Switch>
          {/* If already logged in, skip login page */}
          <Route
            path="/login"
            render={(props) =>
              user ? <Redirect to="/app" /> : <Login {...props} />
            }
          />
          <ProtectedRoute path="/app" component={Layout} />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
