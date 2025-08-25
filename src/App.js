import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Suspense fallback={<div>Loading…</div>}>
          <Switch>
            <Route path="/login" component={Login} />

            {/* Place new routes over this */}
            <Route path="/app" component={Layout} />
            {/* If you have an index page, you can remothis Redirect */}
            <Redirect exact from="/" to="/login" />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
