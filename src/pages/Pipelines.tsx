import React from "react";
import { usePaginatedQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";
import { HeaderBar, List, IconButton, getPipelineStatus } from "../components";

interface Response<T> {
  data: T;
}

const Pipelines = () => {
  const { bitbucket } = useBitbucket();
  const [page] = React.useState(1);

  const { repo_slug, workspace } = useParams<{
    repo_slug: string;
    workspace: string;
  }>();

  const { isLoading, data } = usePaginatedQuery<
    Response<Schema.PaginatedPipelines>
  >(["repositories", workspace, page], (key, workspace, page = 1) =>
    bitbucket.repositories.listPipelines({
      workspace,
      repo_slug,
      page,
      pagelen: 20,
      sort: "-created_on",
    })
  );
  const pipelines = data?.data?.values || [];
  console.log(pipelines);

  const items: List["items"] = pipelines.map((pipeline, index) => {
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
      secondaryText: `${(pipeline.target as any).ref_name} - ${creator.name}`,
      link: `/${pipeline.repository?.full_name}/pipelines/${pipeline.uuid}/`,
      leadingIcon: <IconButton Icon={icon} title={status} color={color} />,
      // trailingIcon: <Image src={creator.avatar} title={creator.name} />,
    };
  });

  return (
    <>
      <HeaderBar
        caption={workspace + " / " + repo_slug}
        title="Pipelines"
        allowBack
      />
      <List items={items} isLoading={isLoading} />
    </>
  );
};

export default Pipelines;
