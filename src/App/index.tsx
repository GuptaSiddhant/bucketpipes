import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
// import NavBar from "./NavBar";
import Repositories from "../pages/Repositories";
import Repository from "../pages/Repository";
import { HeaderBar } from "../components";
// import { useBitbucket } from "../bitbucket";

function App() {
  // const { user } = useBitbucket();

  return (
    <>
      <HeaderBar caption="BucketPipes" title="Repositories" backLink="d" />
      <main className="App">
        {/* <NavBar /> */}
        <Switch>
          <Route path="/:workspace/:repo_slug/pipelines">
            <Repository />
          </Route>
          <Route path="/repositories">
            <Repositories />
          </Route>
          <Route exact path="/">
            <Redirect to="/repositories" />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
