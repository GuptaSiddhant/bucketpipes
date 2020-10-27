import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useBitbucket } from "../../bitbucket";
import { Schema } from "../../bitbucket/types";
import { ListItem, IconButton } from "../../components";
import { theme, styled } from "../../theme";
import { IconCaretDown, IconCaretUp } from "tabler-icons";

import { getPipelineStatus } from "./status";

interface Response<T> {
  data: T;
}

const StyledStep = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;

  li {
    position: sticky;
    top: 60px;
    z-index: 1;
  }

  pre {
    border-radius: 4px;
    margin: 0;
    transform: translateY(-8px);
    padding: 16px 8px;
    background: ${theme.colors.inverse};
    overflow: scroll;
    color: ${theme.colors.default};
  }
`;

const Step = ({
  step,
  index = 0,
  defaultShowLog = false,
}: {
  step: Schema.PipelineStep;
  index?: number;
  defaultShowLog?: boolean;
}) => {
  console.log(step);
  const { bitbucket } = useBitbucket();
  const [showLog, setShowLog] = React.useState(defaultShowLog);
  const { icon, status, color } = getPipelineStatus(step);
  const { repo_slug, workspace, pipeline_uuid } = useParams<{
    repo_slug: string;
    workspace: string;
    pipeline_uuid: string;
  }>();
  const { isLoading, data } = useQuery<Response<ArrayBuffer>>(
    ["step_log", step.uuid],
    () =>
      bitbucket.pipelines.getStepLog({
        workspace,
        repo_slug,
        pipeline_uuid,
        step_uuid: step.uuid,
      })
  );
  const log = new TextDecoder("utf-8").decode(data?.data);

  const timeString = () => {
    const duration = (step?.duration_in_seconds as number) || 0;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  const item: ListItem = {
    uid: step.uuid || "",
    primaryText: (step.name as string) || "Step " + index,
    leadingIcon: <IconButton Icon={icon} title={status} color={color} />,
    secondaryText: timeString(),
    trailingIcon: (
      <IconButton
        Icon={showLog ? IconCaretUp : IconCaretDown}
        onClick={() => setShowLog((val) => !val)}
      />
    ),
  };

  return (
    <StyledStep>
      <ListItem contained {...item} />
      {showLog && <pre>{isLoading ? "Loading..." : log}</pre>}
    </StyledStep>
  );
};

export { Step, getPipelineStatus };
