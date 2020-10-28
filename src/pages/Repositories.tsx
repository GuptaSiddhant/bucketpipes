import React from "react";
import { usePaginatedQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as time from "timeago.js";
import { HeaderBar, List, Image } from "../components";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";
import { Response } from "../bitbucket/request/types";

const Repositories = () => {
  const { bitbucket } = useBitbucket();

  const { workspace } = useParams<{
    workspace: string;
  }>();
  const [page] = React.useState(1);

  const { isLoading, data } = usePaginatedQuery<
    Response<Schema.PaginatedRepositories>
  >(["repositories", { workspace }, page], (_, options, page = 1) =>
    bitbucket.repositories.list({
      ...options,
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

  return (
    <main>
      <HeaderBar title={workspace} caption="Repositories" />
      <List items={items} isLoading={isLoading} />
    </main>
  );
};

export default Repositories;
