import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  IconArrowLeft,
  // IconSettings,
  IconFilter,
  IconLogout,
} from "tabler-icons";
import { theme, styled } from "../../theme";
import { useBitbucket } from "../../bitbucket";
import { IconButton } from "../Misc/IconButton";
import { ReactComponent as LOGO } from "./logo.svg";

interface HeaderBar {
  title: string;
  caption: string;
  allowBack?: boolean;
  action?: object;
}

const StyledHeaderBar = styled.header<{ actions: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 64px;
  background: ${theme.colors.default};
  box-shadow: ${theme.shadows.large};
  padding: 8px 16px;
  z-index: 100;

  display: grid;
  grid-template-columns: max-content 1fr ${(p) =>
      p.actions >= 0 && `repeat(${p.actions + 1}, max-content)`};
  gap: 16px;
  align-items: center;

  #heading {
    padding: 4px 0px;
    height: 48px;
    ${theme.css.truncateText};

    #title {
      font: ${theme.fonts.title};
      color: ${theme.colors.primary};
      padding: 4px 0;
      ${theme.css.truncateText};
    }
    #caption {
      font: ${theme.fonts.subtext};
      color: ${theme.colors.secondary};
      ${theme.css.truncateText};
    }
  }
`;

const HeaderBar = (props: HeaderBar) => {
  const { title, caption, allowBack, action } = props;
  const { logout } = useBitbucket();
  const history = useHistory();
  const backLink = allowBack ? "" : "/";
  return (
    <StyledHeaderBar actions={action ? 1 : 0}>
      {allowBack ? (
        <IconButton Icon={IconArrowLeft} onClick={history.goBack} />
      ) : (
        <Link to={backLink} className="icon">
          <LOGO title="BucketPipes" />
        </Link>
      )}
      <div id="heading">
        <div id="caption">{caption}</div>
        <div id="title">{title}</div>
      </div>
      {action && <IconButton Icon={IconFilter} title={"Filter"} />}

      <IconButton Icon={IconLogout} onClick={logout} title={"Logout"} />
    </StyledHeaderBar>
  );
};

export { HeaderBar };
