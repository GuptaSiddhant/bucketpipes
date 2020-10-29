import React from "react";
import { IconArrowUpCircle, IconArrowDownCircle } from "tabler-icons";
import { styled } from "../../theme";
import { IconButton } from "../Misc/Button";

const StyledFab = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: grid;
  grid-template-rows: repeat(2, max-content);
  gap: 16px;
  z-index: 10;
`;

const ScrollFAB = () => (
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

export { ScrollFAB };
