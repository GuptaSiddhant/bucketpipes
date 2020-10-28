import React, { Suspense } from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import "./index.css";
import { Bitbucket, Context, BitbucketContext } from "../bitbucket";
import { APIClient } from "../bitbucket/client/types";
import { Schema } from "../bitbucket/types";

import { Loader } from "../components";
import Login from "../pages/Login";
const Router = React.lazy(() => import("./Router"));

const localStorageTokenKey = "bitbucketToken";
const localStorageTimeKey = "bitbucketTokenTimestamp";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      suspense: true,
    },
  },
});

interface State {
  user: Schema.Account | null;
  isAuth: boolean;
  bitbucket: BitbucketContext["bitbucket"];
}

const Auth = () => {
  const defaultState = React.useMemo(
    () => ({
      user: null,
      isAuth: false,
      bitbucket: {} as APIClient,
    }),
    []
  );
  const [state, setState] = React.useState<State>(defaultState);
  const { user, isAuth, bitbucket } = state;

  const logout = React.useCallback(() => {
    localStorage.removeItem(localStorageTokenKey);
    localStorage.removeItem(localStorageTimeKey);
    setState(defaultState);
    window.location.href = "/";
  }, [defaultState]);

  const authenticate = React.useCallback(
    async (token: string) => {
      const client = new Bitbucket({ auth: { token } });
      const { status, data } = await client.users.getAuthedUser({});
      if (status === 200) {
        localStorage.setItem(localStorageTokenKey, token);
        localStorage.setItem(
          localStorageTimeKey,
          new Date().valueOf().toString()
        );
        setState({
          bitbucket: client,
          user: data,
          isAuth: true,
        });
      } else logout();
    },
    [logout]
  );

  React.useEffect(() => {
    const tokenTime = parseInt(
      localStorage.getItem(localStorageTimeKey) || "0"
    );
    const currentTime = new Date().valueOf();
    if (currentTime - tokenTime > 3_600_000) {
      localStorage.removeItem(localStorageTokenKey);
      localStorage.removeItem(localStorageTimeKey);
    }

    const localToken = localStorage.getItem(localStorageTokenKey) || "";
    if (localToken !== "") {
      authenticate(localToken);
    } else {
      const params = window.location.hash.split("&");
      if (params.length > 0 && params[0].startsWith("#access_token=")) {
        authenticate(
          decodeURIComponent(params[0].replace("#access_token=", ""))
        );
      }
    }
  }, [authenticate]);

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Context.Provider value={{ bitbucket, logout, user }}>
        <Suspense fallback={<Loader />}>
          {isAuth ? <Router /> : <Login />}
        </Suspense>
      </Context.Provider>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </ReactQueryCacheProvider>
  );
};

export default Auth;
