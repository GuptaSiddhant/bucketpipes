import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Response } from "../bitbucket/request/types";
import { usePaginatedQuery } from "react-query";
import { Schema } from "../bitbucket/types";

import Repositories from "../pages/Repositories";
import Pipelines from "../pages/Pipelines";
import Pipeline from "../pages/Pipeline";

const Router = () => {
  const { user, bitbucket, logout } = useBitbucket();

  const { data, isError } = usePaginatedQuery<
    Response<Schema.PaginatedWorkspaces>
  >(
    ["workspaces"],
    (key) =>
      bitbucket.workspaces.getWorkspaces({
        username: user?.uuid,
        pagelen: 100,
      }),
    {
      retry: false,
    }
  );

  if (isError) logout();

  const workspaces = data?.data.values || [{ name: "" }];
  const workspace = workspaces[0].name;

  return (
    <Switch>
      <Route path="/:workspace/:repo_slug/pipelines/:pipeline_uuid">
        <Pipeline />
      </Route>
      <Route path="/:workspace/:repo_slug/pipelines">
        <Pipelines />
      </Route>
      <Route path="/:workspace">
        <Repositories />
      </Route>
      <Route path="/">
        <Redirect to={"/" + workspace} />
      </Route>
    </Switch>
  );
};

export default Router;
