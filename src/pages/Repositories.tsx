import React from "react";
import { usePaginatedQuery } from "react-query";
import * as time from "timeago.js";
import { HeaderBar, List, Image } from "../components";
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
      pagelen: 50,
      sort: "-updated_on",
    })
  );
  const repositories = data?.data?.values || [];

  const getLastUpdated = ({ updated_on }: Schema.Repository) =>
    updated_on ? time.format(new Date(updated_on)) : "";

  const items: List["items"] = repositories.map((repository, index) => ({
    uid: repository.uuid || index.toString(),
    primaryText: repository.name || "",
    secondaryText:
      repository.project?.name + " - " + getLastUpdated(repository),
    link: `/${repository.full_name}/pipelines`,
    leadingIcon: (
      <Image
        src={repository.links?.avatar?.href || ""}
        title={repository.name}
      />
    ),
  }));

  return <List items={items} isLoading={isLoading} />;
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
    <>
      <HeaderBar caption={label} title="Repositories" />
      <Repositories workspace={value} />
    </>
  );
};

export default Workspaces;
