import React from "react";
import { Client } from "./client";
import authPlugin from "./plugins/auth";
import noticePlugin from "./plugins/notice";
import paginationPlugin from "./plugins/pagination";
import registerApiEndpointsPlugin from "./plugins/register-api-endpoints";
import registerEndpointsPlugin from "./plugins/register-endpoints";
import validateRequestPlugin from "./plugins/validate-request";
import { APIClient, Schema } from "./types";

const Plugins = [
  noticePlugin,
  authPlugin,
  paginationPlugin,
  registerEndpointsPlugin,
  registerApiEndpointsPlugin,
  validateRequestPlugin,
];

export const Bitbucket = Client.plugins(Plugins);

type BitbucketType = APIClient | undefined;
export interface BitbucketContext {
  bitbucket: BitbucketType;
  logout: () => void;
  user: Schema.Account | null;
}

export const Context = React.createContext<BitbucketContext>({
  bitbucket: undefined,
  logout: () => {},
  user: null,
});

export const useBitbucket = (): BitbucketContext => React.useContext(Context);
