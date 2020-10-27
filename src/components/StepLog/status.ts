import { Schema } from "../../bitbucket/types";
import { IconButton } from "../Misc/IconButton";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconCircleMinus,
  IconAlertCircle,
  IconPlayerStop,
} from "tabler-icons";
import { theme } from "../../theme";

const getPipelineStatus = ({
  state,
}: Schema.Pipeline | Schema.PipelineStep) => {
  let icon: IconButton["Icon"] = IconCircleDashed,
    status: string = "",
    color: string = "inherit";

  if (!!state?.name)
    if (state.name.toUpperCase() === "IN_PROGRESS") {
      switch (state.stage.name.toUpperCase()) {
        case "PAUSED":
          icon = IconCircleMinus;
          status = "Paused";
          color = theme.colors.warning;
          break;
        default:
          icon = IconCircleDashed;
          status = state.stage.name;
          color = theme.colors.note;
          break;
      }
    } else if (state.name.toUpperCase() === "COMPLETED") {
      switch (state.result.name.toUpperCase()) {
        case "FAILED":
          icon = IconAlertCircle;
          status = "Failed";
          color = theme.colors.negative;
          break;
        case "SUCCESSFUL":
          icon = IconCircleCheck;
          status = "Successful";
          color = theme.colors.positive;
          break;
        case "STOPPED":
          icon = IconPlayerStop;
          status = `Stopped by ${state.result.terminator.display_name}`;
          color = theme.colors.negative;
          break;
      }
    }
  return { icon, status, color };
};

export { getPipelineStatus };
