import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
// import NavBar from "./NavBar";
import Repositories from "../pages/Repositories";
import Pipelines from "../pages/Pipelines";
import Pipeline from "../pages/Pipeline";

// import { useBitbucket } from "../bitbucket";

function App() {
  // const { user } = useBitbucket();

  return (
    <>
      {/* <HeaderBar caption="BucketPipes" title="Repositories" allowBack /> */}
      <main className="App">
        {/* <NavBar /> */}
        <Switch>
          <Route path="/:workspace/:repo_slug/pipelines/:pipeline_uuid">
            <Pipeline />
          </Route>
          <Route path="/:workspace/:repo_slug/pipelines">
            <Pipelines />
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
