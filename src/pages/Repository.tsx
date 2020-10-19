import React from "react";
import { usePaginatedQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";

interface Response<T> {
  data: T;
}

const Repository = () => {
  const { bitbucket } = useBitbucket();
  const [page] = React.useState(1);

  let { repo_slug, workspace } = useParams<{
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
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {pipelines.map((pipeline) => (
        <li key={pipeline.uuid}>
          {pipeline.build_number} - {(pipeline.state?.result as any).name}
        </li>
      ))}
    </ul>
  );
};

export default Repository;
