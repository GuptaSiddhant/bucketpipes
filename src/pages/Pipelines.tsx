import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";
import {
  HeaderBar,
  IconButton,
  getPipelineStatus,
  Loader,
  InfiniteList,
} from "../components";

interface Params {
  repo_slug: string;
  workspace: string;
}

const Pipelines = () => {
  const { bitbucket } = useBitbucket();
  const fetchParams = useParams<Params>();
  const options: InfiniteList<Schema.PaginatedPipelines, Schema.Pipeline> = {
    uuid: "pipelines",
    fetchParams,
    fetchFunction: bitbucket.repositories.listPipelines,
    fetchSort: "-created_on",
    itemBuilder: (pipeline, index) => {
      const { icon, status, color } = getPipelineStatus(pipeline);
      const creator = {
          name:
            pipeline.creator?.display_name ||
            pipeline.creator?.username ||
            "Scheduled",
          avatar: pipeline.creator?.links?.avatar?.href || "",
        },
        branch = (pipeline.target as any).ref_name,
        commitHash = ((pipeline.target as any).commit.hash as string).slice(
          0,
          7
        ),
        secondaryText = `${branch}${commitHash && ` - ${commitHash}`} - ${
          creator.name
        }`;

      return {
        uid: pipeline.uuid || index.toString(),
        primaryText: `#${pipeline.build_number} - ${status}`,
        secondaryText,
        link: `/${pipeline.repository?.full_name}/pipelines/${pipeline.uuid}/`,
        leadingIcon: <IconButton Icon={icon} title={status} color={color} />,
      };
    },
  };

  return (
    <>
      <HeaderBar title={fetchParams.repo_slug} caption="PIPELINES" allowBack />
      <Suspense fallback={<Loader />}>
        <InfiniteList {...options} />
      </Suspense>
    </>
  );
};

export default Pipelines;
