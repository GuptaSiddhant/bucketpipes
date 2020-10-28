import { Schema } from "../../bitbucket/types";
import { IconButton } from "../Misc/Button";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconCircleMinus,
  IconAlertTriangle,
  IconPlayerStop,
  IconCircle,
  IconPlayerPause,
  IconPoint,
} from "tabler-icons";
import { theme } from "../../theme";

const getPipelineStatus = ({
  state,
}: Schema.Pipeline | Schema.PipelineStep) => {
  let icon: IconButton["Icon"] = IconCircleDashed,
    status: string = "Ongoing",
    color: string = "inherit";

  if (!!state?.name)
    switch (state.name.toUpperCase()) {
      case "IN_PROGRESS":
      case "PENDING":
        switch (state.stage.name.toUpperCase()) {
          case "PENDING":
            icon = IconCircle;
            status = "Pending";
            color = theme.colors.note;
            break;
          case "HALTED":
            icon = IconCircleMinus;
            status = "Halted";
            color = theme.colors.warning;
            break;
          case "PAUSED":
            icon = IconPlayerPause;
            status = "Paused";
            color = theme.colors.warning;
            break;
          default:
            status = state.stage.name;
            color = theme.colors.note;
            break;
        }
        break;
      case "COMPLETED":
        switch (state.result.name.toUpperCase()) {
          case "SUCCESSFUL":
            icon = IconCircleCheck;
            status = "Successful";
            color = theme.colors.positive;
            break;
          case "FAILED":
            icon = IconAlertTriangle;
            status = "Failed";
            color = theme.colors.negative;
            break;
          case "ERROR":
            icon = IconAlertTriangle;
            status = "Error";
            color = theme.colors.negative;
            break;
          case "STOPPED":
            icon = IconPlayerStop;
            status = `Stopped by ${
              state.result.terminator?.display_name || "user"
            }`;
            color = theme.colors.negative;
            break;
          case "NOT_RUN":
            icon = IconPoint;
            status = `Didn't run`;
            color = theme.colors.disabled;
            break;
          default:
            status = state.result.name;
            color = theme.colors.negative;
            break;
        }
        break;
      default:
        status = state.name;
    }

  return { icon, status, color };
};

export { getPipelineStatus };
