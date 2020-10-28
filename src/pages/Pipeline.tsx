import React from "react";
import { useQuery, usePaginatedQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";
import { Response } from "../bitbucket/request/types";
import { HeaderBar, StyledList, IconButton, Step, Loader } from "../components";
import { styled } from "../theme";
import { IconArrowUpCircle, IconArrowDownCircle } from "tabler-icons";

interface Param {
  repo_slug: string;
  workspace: string;
  pipeline_uuid: string;
}

const StyledFab = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 16px;
`;

const FAB = () => (
  <StyledFab className="fab">
    <IconButton
      Icon={IconArrowUpCircle}
      contained
      onClick={() =>
        window.scroll({
          top: 0,
          behavior: "smooth",
        })
      }
    />
    <IconButton
      Icon={IconArrowDownCircle}
      contained
      onClick={() =>
        window.scroll({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }
    />
  </StyledFab>
);

const StepList = () => {
  const { bitbucket } = useBitbucket();
  const { repo_slug, workspace, pipeline_uuid } = useParams<Param>();

  const { data: stepsResponse } = usePaginatedQuery<
    Response<Schema.PaginatedPipelineSteps>
  >(["pipeline_steps", { workspace, repo_slug, pipeline_uuid }], (_, options) =>
    bitbucket.pipelines.listSteps({ ...options, pagelen: 100 })
  );
  const steps = stepsResponse?.data.values || [];
  return (
    <StyledList>
      {steps.map((step, index, array) => (
        <Step
          step={step}
          key={step.uuid}
          index={index + 1}
          defaultShowLog={array.length === 1}
        />
      ))}
    </StyledList>
  );
};

const Pipeline = () => {
  const { bitbucket } = useBitbucket();
  const { repo_slug, workspace, pipeline_uuid } = useParams<Param>();
  const { data: pipelineResponse } = useQuery<Response<Schema.Pipeline>>(
    ["pipeline", { workspace, repo_slug, pipeline_uuid }],
    (_, options) =>
      bitbucket.pipelines.get({ ...options, fields: "build_number,uuid" })
  );
  const pipeline = pipelineResponse?.data;

  if (!pipeline) return null;
  return (
    <main>
      <React.Suspense fallback={<Loader />}>
        <StepList />
      </React.Suspense>
      <HeaderBar
        caption={workspace + " / " + repo_slug}
        title={"Pipeline #" + pipeline.build_number?.toString()}
        allowBack
      />
      <FAB />
    </main>
  );
};

export default Pipeline;
