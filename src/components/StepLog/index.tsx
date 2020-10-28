import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IconCaretDown, IconCaretUp } from "tabler-icons";
import { useBitbucket } from "../../bitbucket";
import { Schema } from "../../bitbucket/types";
import { Response } from "../../bitbucket/request/types";
import { ListItem, IconButton } from "../../components";
import { theme, styled } from "../../theme";
import { getPipelineStatus } from "./status";

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

const Log = ({ step }: { step: Schema.PipelineStep }) => {
  const { bitbucket } = useBitbucket();
  const { repo_slug, workspace, pipeline_uuid } = useParams<{
    repo_slug: string;
    workspace: string;
    pipeline_uuid: string;
  }>();

  const { isLoading, data } = useQuery<Response<ArrayBuffer>>(
    [
      "pipeline_step_log",
      { workspace, repo_slug, pipeline_uuid, step_uuid: step.uuid },
    ],
    (_, options) => bitbucket.pipelines.getStepLog({ ...options }),
    { refetchInterval: 1000 }
  );
  const log = new TextDecoder("utf-8").decode(data?.data);
  return (
    <pre>
      {isLoading ? "Loading..." : log || "No logs found for this step."}
    </pre>
  );
};

const Step = ({
  step,
  index = 0,
  defaultShowLog = false,
}: {
  step: Schema.PipelineStep;
  index?: number;
  defaultShowLog?: boolean;
}) => {
  const [showLog, setShowLog] = React.useState(defaultShowLog);
  const { icon, status, color } = getPipelineStatus(step);

  const toggleShowLog = React.useCallback(() => setShowLog((val) => !val), []);

  const item: ListItem = React.useMemo(() => {
    const timeString = () => {
      const duration = (step?.duration_in_seconds as number) || 0;
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes}m ${seconds}s`;
    };
    return {
      uid: step.uuid || "",
      primaryText: (step.name as string) || "Step " + index,
      leadingIcon: <IconButton Icon={icon} title={status} color={color} />,
      secondaryText: status + " - " + timeString(),
      trailingIcon: <IconButton Icon={showLog ? IconCaretUp : IconCaretDown} />,
    };
  }, [step, color, icon, index, showLog, status]);

  return (
    <StyledStep>
      <ListItem contained {...item} onClick={toggleShowLog} />
      {showLog && <Log step={step} />}
    </StyledStep>
  );
};

export { Step, getPipelineStatus };
