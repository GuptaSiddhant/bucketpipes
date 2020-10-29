import React, { Suspense } from "react";
import * as time from "timeago.js";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";
import { HeaderBar, Image, Loader, InfiniteList } from "../components";

interface Params {
  workspace: string;
}

const getLastUpdated = ({ updated_on }: Schema.Repository) =>
  updated_on ? time.format(new Date(updated_on)) : "";

const Repositories = () => {
  const { bitbucket } = useBitbucket();
  const fetchParams = useParams<Params>();

  const options: InfiniteList<
    Schema.PaginatedRepositories,
    Schema.Repository
  > = {
    uuid: "repositories",
    fetchParams,
    fetchFunction: bitbucket.repositories.list,
    fetchSort: "-updated_on",
    itemBuilder: (repository, index) => ({
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
    }),
  };

  return (
    <>
      <HeaderBar title={fetchParams.workspace} caption={`REPOSITORIES`} />
      <Suspense fallback={<Loader />}>
        <InfiniteList {...options} />
      </Suspense>
    </>
  );
};

export default Repositories;
