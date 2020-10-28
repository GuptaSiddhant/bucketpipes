import React from "react";
import { useQuery, usePaginatedQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";
import { Response } from "../bitbucket/request/types";
import { HeaderBar, StyledList, IconButton, Step } from "../components";
import { styled } from "../theme";
import { IconArrowUpCircle, IconArrowDownCircle } from "tabler-icons";

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

const Pipeline = () => {
  const { bitbucket } = useBitbucket();

  let { repo_slug, workspace, pipeline_uuid } = useParams<{
    repo_slug: string;
    workspace: string;
    pipeline_uuid: string;
  }>();

  const { data: pipelineResponse } = useQuery<Response<Schema.Pipeline>>(
    ["pipeline", { workspace, repo_slug, pipeline_uuid }],
    (_, options) => bitbucket.pipelines.get({ ...options })
  );
  const { data: stepsResponse } = usePaginatedQuery<
    Response<Schema.PaginatedPipelineSteps>
  >(["pipeline_steps", { workspace, repo_slug, pipeline_uuid }], (_, options) =>
    bitbucket.pipelines.listSteps({ ...options, pagelen: 100 })
  );
  const pipeline = pipelineResponse?.data;
  const steps = stepsResponse?.data.values;

  if (!pipeline) return null;
  return (
    <main>
      <StyledList>
        {(steps || []).map((step, index, array) => (
          <Step
            step={step}
            key={step.uuid}
            index={index + 1}
            defaultShowLog={array.length === 1}
          />
        ))}
      </StyledList>
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
