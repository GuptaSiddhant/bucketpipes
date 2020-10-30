import React from "react";
import axios from "axios";
import { Schema } from "./types";

export const localStorageTokenKey = "bitbucketToken";

// Create API client
const client = axios.create({
  baseURL: "https://api.bitbucket.org/2.0/",
  headers: { Accept: "application/json" },
});

// Add a request interceptor
client.interceptors.request.use(function (config) {
  const token = localStorage.getItem(localStorageTokenKey);
  if (token) config.headers.Authorization = "Basic " + token;
  return config;
});

export const authenticate = async () => {
  const x = await client.get(`user`);
  console.log(x);
};

// export interface BitbucketContext {
//   logout: () => void;
//   user: Schema.Account | null;
// }

// export const Context = React.createContext<BitbucketContext>({
//   bitbucket: {} as APIClient,
//   logout: () => {},
//   user: null,
// });

// export const useBitbucket = (): BitbucketContext => React.useContext(Context);

export default client;
export * from "./types";
