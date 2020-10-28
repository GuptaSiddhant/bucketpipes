import React, { Suspense } from "react";
import { usePaginatedQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";
import { Response } from "../bitbucket/request/types";
import {
  HeaderBar,
  List,
  IconButton,
  getPipelineStatus,
  Loader,
} from "../components";

interface Params {
  repo_slug: string;
  workspace: string;
}

const PipelineList = () => {
  const { bitbucket, logout } = useBitbucket();
  const [page] = React.useState(1);

  const { repo_slug, workspace } = useParams<Params>();
  const { isLoading, data, isError } = usePaginatedQuery<
    Response<Schema.PaginatedPipelines>
  >(["pipelines", { workspace, repo_slug }, page], (_, options, page = 1) =>
    bitbucket.repositories.listPipelines({
      ...options,
      page,
      pagelen: 100,
      sort: "-created_on",
    })
  );
  if (isError) logout();

  const pipelines = data?.data?.values || [];

  const items: List["items"] =
    pipelines.length > 0
      ? pipelines.map((pipeline, index) => {
          const { icon, status, color } = getPipelineStatus(pipeline);
          const creator = {
            name:
              pipeline.creator?.display_name ||
              pipeline.creator?.username ||
              "Scheduled",
            avatar: pipeline.creator?.links?.avatar?.href || "",
          };

          return {
            uid: pipeline.uuid || index.toString(),
            primaryText: `#${pipeline.build_number} - ${status}`,
            secondaryText: `${(pipeline.target as any).ref_name} - ${
              creator.name
            }`,
            link: `/${pipeline.repository?.full_name}/pipelines/${pipeline.uuid}/`,
            leadingIcon: (
              <IconButton Icon={icon} title={status} color={color} />
            ),
            // trailingIcon: <Image src={creator.avatar} title={creator.name} />,
          };
        })
      : [];

  return (
    <List
      items={items}
      isLoading={isLoading}
      emptyListFallback="Pipelines are not available for this repository."
    />
  );
};

const Pipelines = () => {
  const { repo_slug } = useParams<Params>();
  return (
    <main>
      <HeaderBar title={repo_slug} caption="Pipelines" allowBack />
      <Suspense fallback={<Loader />}>
        <PipelineList />
      </Suspense>
    </main>
  );
};

export default Pipelines;
