import React from "react";
import { usePaginatedQuery } from "react-query";
import { Link } from "react-router-dom";
import { HeaderBar } from "../components";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";

interface Response<T> {
  data: T;
}

type SelectOption = {
  label: string;
  value: string;
};

const Repositories = ({ workspace }: { workspace: string }) => {
  const { bitbucket } = useBitbucket();
  const [page] = React.useState(1);

  const { isLoading, data } = usePaginatedQuery<
    Response<Schema.PaginatedRepositories>
  >(["repositories", workspace, page], (key, workspace, page = 1) =>
    bitbucket.repositories.list({
      workspace,
      page,
      pagelen: 20,
      sort: "-updated_on",
    })
  );
  const repositories = data?.data?.values || [];
  console.log(repositories[0]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {repositories.map((repository) => (
        <li key={repository.uuid}>
          <Link to={`/${workspace}/${repository.uuid}/pipelines`}>
            {repository.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Workspaces = () => {
  const { user, bitbucket } = useBitbucket();
  const [{ label, value }, setWorkspace] = React.useState<SelectOption>({
    label: "",
    value: "",
  });

  const { isLoading, data } = usePaginatedQuery<
    Response<Schema.PaginatedWorkspaces>
  >(["workspaces"], (key) =>
    bitbucket.workspaces.getWorkspaces({
      username: user?.uuid,
      pagelen: 100,
    })
  );

  const selectOptions: SelectOption[] = React.useMemo(
    () =>
      (data?.data.values || []).map(({ name, uuid }) => ({
        label: name || "",
        value: uuid || "",
      })),
    [data]
  );

  React.useEffect(() => {
    if (selectOptions.length > 0) setWorkspace(selectOptions[0]);
  }, [selectOptions]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <HeaderBar caption={label} title="Repositories" />
      {/* {selectOptions.length > 1 && (
        <Select options={selectOptions} onChange={setWorkspace as any} />
      )} */}
      <div>
        <Repositories workspace={value} />
      </div>
    </div>
  );
};

export default Workspaces;
