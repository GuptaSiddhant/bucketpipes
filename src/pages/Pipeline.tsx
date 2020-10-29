import React, { Suspense } from "react";
import { useQuery, usePaginatedQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../bitbucket";
import { Schema } from "../bitbucket/types";
import { Response } from "../bitbucket/request/types";
import { HeaderBar, StyledList, Step, Loader, ScrollFAB } from "../components";

interface Param {
  repo_slug: string;
  workspace: string;
  pipeline_uuid: string;
}

const StepList = () => {
  const { bitbucket } = useBitbucket();
  const { repo_slug, workspace, pipeline_uuid } = useParams<Param>();

  const { data: stepsResponse } = usePaginatedQuery<
    Response<Schema.PaginatedPipelineSteps>
  >(["pipeline_steps", { workspace, repo_slug, pipeline_uuid }], (_, options) =>
    bitbucket.pipelines.listSteps({ ...options, pagelen: 100 })
  );

  const steps = stepsResponse?.data.values || [];
  return steps.length > 0 ? (
    <StyledList>
      {steps.map((step, index, array) => (
        <Suspense key={step.uuid} fallback={<Loader />}>
          <Step
            step={step}
            key={step.uuid}
            index={index + 1}
            defaultShowLog={array.length === 1}
          />
        </Suspense>
      ))}
    </StyledList>
  ) : null;
};

const Pipeline = () => {
  const { bitbucket } = useBitbucket();
  const { repo_slug, workspace, pipeline_uuid } = useParams<Param>();
  const { data: pipelineResponse } = useQuery<Response<Schema.Pipeline>>(
    ["pipeline", { workspace, repo_slug, pipeline_uuid }],
    (_, options) =>
      bitbucket.pipelines.get({ ...options, fields: "build_number,uuid" })
  );
  return (
    <>
      <HeaderBar
        caption={workspace + " / " + repo_slug}
        title={
          "Pipeline #" + (pipelineResponse?.data?.build_number || 0).toString()
        }
        allowBack
      />
      <main>
        <React.Suspense fallback={<Loader />}>
          <StepList />
        </React.Suspense>
        <ScrollFAB />
      </main>
    </>
  );
};

export default Pipeline;
