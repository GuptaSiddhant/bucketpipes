import React from "react";
import { styled, theme } from "../../theme";
import { IconLoader } from "tabler-icons";

const Styled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .loading {
    animation: spin infinite 3s linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return (
    <Styled>
      <IconLoader className="loading" size={80} color={theme.colors.disabled} />
      <div>Loading...</div>
    </Styled>
  );
};

export { Loader };
