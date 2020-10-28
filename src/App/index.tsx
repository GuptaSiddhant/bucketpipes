import React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import Router from "./Router";
import "./index.css";
import { Bitbucket, Context, BitbucketContext } from "../bitbucket";
import { APIClient } from "../bitbucket/client/types";
import { Schema } from "../bitbucket/types";

const localStorageKey = "bitbucketToken";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      retry: 0,
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
    localStorage.removeItem(localStorageKey);
    setState(defaultState);
    window.location.href = "/";
  }, [defaultState]);

  const authenticate = React.useCallback(
    async (token: string) => {
      const client = new Bitbucket({ auth: { token } });
      const { status, data } = await client.users.getAuthedUser({});
      if (status === 200) {
        localStorage.setItem(localStorageKey, token);
        setState({
          bitbucket: client,
          user: data,
          isAuth: true,
        });
        // window.location.href = "/";
      } else logout();
    },
    [logout]
  );

  React.useEffect(() => {
    const localToken = localStorage.getItem(localStorageKey) || "";
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
        <Router isAuth={isAuth} />
      </Context.Provider>
    </ReactQueryCacheProvider>
  );
};

export default Auth;
