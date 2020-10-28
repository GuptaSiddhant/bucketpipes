import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Response } from "../bitbucket/request/types";
import { usePaginatedQuery } from "react-query";
import { Schema } from "../bitbucket/types";
import Loader from "../pages/Loader";
const Repositories = lazy(() => import("../pages/Repositories"));
const Pipelines = lazy(() => import("../pages/Pipelines"));
const Pipeline = lazy(() => import("../pages/Pipeline"));

const login = () => {
  const key = "VfZarR4QDMLH8pXVDP",
    url = `https://bitbucket.org/site/oauth2/authorize?client_id=${key}&response_type=token`;
  window.location.href = url;
};

const Router = () => {
  const { user, bitbucket } = useBitbucket();

  const { isLoading, data } = usePaginatedQuery<
    Response<Schema.PaginatedWorkspaces>
  >(["workspaces"], (key) =>
    bitbucket.workspaces.getWorkspaces({
      username: user?.uuid,
      pagelen: 100,
    })
  );
  if (isLoading) return <div> Loading...</div>;

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
        <Redirect to={"/" + workspace + "/"} />
      </Route>
    </Switch>
  );
};

export default ({ isAuth }: { isAuth: boolean }) => {
  if (!isAuth)
    return (
      <button onClick={login} className="button">
        Login
      </button>
    );
  else
    return (
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
    );
};
