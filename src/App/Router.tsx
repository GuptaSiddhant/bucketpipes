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
    () =>
      bitbucket.workspaces.getWorkspaces({
        username: user?.uuid,
        pagelen: 100,
      }),
    {
      retry: false,
    }
  );

  if (isError) logout();

  const FAWorkspaceSlug = "fasolutions-ondemand";

  const workspaces =
    data?.data.values || ([{ name: "", slug: "" }] as Schema.Workspace[]);

  const workspace =
    workspaces.findIndex((w) => w.slug === FAWorkspaceSlug) > -1
      ? FAWorkspaceSlug
      : workspaces[0].slug;

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
