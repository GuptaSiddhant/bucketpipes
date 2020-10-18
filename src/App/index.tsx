import React from "react";
import { Bitbucket } from "../bitbucket";
import "./App.css";

const bitbucket = new Bitbucket({
    auth: {
      username: "fasiddhant",
      password: "wFNTkAPwCZUdmGgjQKjC",
    },
  }),
  workspace = "fasolutions-ondemand",
  repo_slug = "fa-admin-console-app",
  log = (text = "") => ({ data }: any) => console.log(text, data);

bitbucket.pipelines.list({ repo_slug, workspace }).then(log("Pipelines"));

interface User {
  email: string;
}

interface State {
  isAuth: boolean;
  token: string;
  user: User | null;
  key: string;
}

function App() {
  const defaultState: State = {
    isAuth: false,
    token: "",
    user: null,
    key: "",
  };

  const [state, setState] = React.useState<State>(defaultState);
  const { isAuth, user } = state;

  const login = React.useCallback(() => {
    const key = "VfZarR4QDMLH8pXVDP";
    window.location.href = `https://bitbucket.org/site/oauth2/authorize?client_id=${key}&response_type=token`;
  }, []);

  const updateState = React.useCallback((newState: Partial<State> = {}) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const logout = React.useCallback(() => updateState(defaultState), [
    updateState,
    defaultState,
  ]);

  // const authenticate = React.useCallback(async (token: string) => {
  //   fetch("https://api.bitbucket.org/2.0/auth/bitbucket", {method: "POST", headers: {}});
  //   client
  //     .post("/auth/bitbucket", {
  //       access_token: token,
  //     })
  //     .then((response) => {
  //       updateState({
  //         isAuth: true,
  //         token: response.headers["x-auth-token"],
  //         user: response.data,
  //         key: key,
  //       });
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //       updateState({ ...defaultState, key });
  //     });
  // }, []);

  React.useEffect(() => {
    const params = window.location.hash.split("&");
    if (params.length > 0 && params[0].startsWith("#access_token=")) {
      const token = decodeURIComponent(params[0].replace("#access_token=", ""));
      console.log(token);
      const clientOptions = {
        auth: {
          token,
        },
      };

      const b2 = new Bitbucket(clientOptions);
      b2.repositories
        .list({
          workspace: "fasolutions-ondemand",
        })
        .then(console.log);
    }
  }, []);

  return (
    <div className="App">
      {!!isAuth ? (
        <div>
          <p>Authenticated</p>
          <div>{user?.email}</div>
          <div>
            <button onClick={logout} className="button">
              Log out
            </button>
          </div>
        </div>
      ) : (
        <button onClick={login} className="button">
          Bitbucket Login
        </button>
      )}
    </div>
  );
}

export default App;
