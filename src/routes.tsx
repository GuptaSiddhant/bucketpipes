import React from "react";
import { Route, Switch, RouteProps, Redirect } from "react-router-dom";
import Repositories from "../pages/Repositories";
import Repository from "../pages/Repository";

interface IRoute extends RouteProps {
  routes?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: "/",
    component: Repositories,
  },
  {
    path: "/:workspace",
    component: Repositories,
    routes: [
      {
        path: "/:repoSlug",
        component: Repository,
      },
    ],
  },
];

const getString = (x: string | string[] = "", join = "/") =>
  typeof x === "string" ? x : x.join(join);

export function RouteWithSubRoutes() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          render={
            route.render ||
            ((props) => {
              // pass the sub-routes down to keep nesting
              const C = route.component as React.ElementType;
              return (
                <C
                  {...props}
                  routes={(route.routes || []).map((subRoute) => ({
                    ...subRoute,
                    path:
                      getString(route.path) + getString(subRoute.path) || "",
                  }))}
                />
              );
            })
          }
        />
      ))}
    </Switch>
  );
}
