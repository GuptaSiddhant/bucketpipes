import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ReactQueryDevtools } from "react-query-devtools";
import {
  Bitbucket,
  Context,
  useBitbucket,
  BitbucketContext,
} from "./bitbucket";
import { APIClient, Schema } from "./bitbucket/types";

const localStorageKey = "bitbucketToken";

interface State {
  user: Schema.Account | null;
  isAuth: boolean;
  bitbucket: BitbucketContext["bitbucket"];
}

const Root = () => {
  const defaultState = React.useMemo(
    () => ({
      user: null,
      isAuth: false,
      bitbucket: undefined,
    }),
    []
  );
  const [state, setState] = React.useState<State>(defaultState);
  const { user, isAuth, bitbucket } = state;

  const login = () => {
    const key = "VfZarR4QDMLH8pXVDP",
      url = `https://bitbucket.org/site/oauth2/authorize?client_id=${key}&response_type=token`;
    window.location.href = url;
  };

  const logout = React.useCallback(() => {
    localStorage.removeItem(localStorageKey);
    setState(defaultState);
    window.location.href = "/";
  }, [defaultState]);

  const authenticate = React.useCallback(
    async (token: string) => {
      const client = new Bitbucket({ auth: { token } }) as APIClient;
      const { status, data } = await client.users.getAuthedUser({});
      console.log({ status, data });
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
    <Context.Provider value={{ bitbucket, logout, user }}>
      {isAuth ? (
        <App />
      ) : (
        <button onClick={login} className="button">
          Login
        </button>
      )}
    </Context.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
    {process.env.NODE_ENV !== "production" && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

export { useBitbucket };
