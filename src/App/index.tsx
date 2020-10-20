import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Repositories from "../pages/Repositories";
import Repository from "../pages/Repository";
import { RouteWithSubRoutes } from "./routes";

function App() {
  // const { logout, user } = useBitbucket();

  return (
    <div className="App">
      <NavBar />
      {/* <Switch>
        <Route path="/:workspace/:repo_slug/pipelines">
          <Repository />
        </Route>
        <Route path="/repositories">
          <Repositories />
        </Route>
        <Route exact path="/">
          <Redirect to="/repositories" />
        </Route>
      </Switch> */}

      <RouteWithSubRoutes />
    </div>
  );
}

export default App;
