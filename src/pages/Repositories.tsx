import React from "react";
import { usePaginatedQuery } from "react-query";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";

interface Response<T> {
  data: T;
}

const Repositories = ({ workspace }: { workspace: string }) => {
  const { bitbucket } = useBitbucket();
  const [page] = React.useState(1);

  const { isLoading, data } = usePaginatedQuery<
    Response<Schema.PaginatedRepositories>
  >(["repositories", workspace, page], (key, workspace, page = 1) =>
    bitbucket.repositories.list({ workspace, page })
  );
  const repositories = data?.data?.values || [];

  console.log(repositories);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {repositories.map((repository) => (
        <li key={repository.uuid}>{repository.name}</li>
      ))}
    </div>
  );
};

const Workspaces = () => {
  const { user, bitbucket } = useBitbucket();
  const [page] = React.useState(1);

  const { isLoading, data } = usePaginatedQuery<
    Response<Schema.PaginatedWorkspaces>
  >(["workspaces", page], (key, page = 1) =>
    bitbucket.workspaces.getWorkspaces({ username: user?.uuid, page })
  );

  const workspaces = data?.data.values || [];

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {workspaces.map((workspace) => (
        <div key={workspace.uuid}>
          <h1>{workspace.name}</h1>
          <Repositories workspace={workspace.uuid || ""} />
        </div>
      ))}
    </div>
  );
};

export default Workspaces;
