import React from "react";
import { Link } from "react-router-dom";
import { IconArrowLeft, IconSettings, IconFilter } from "tabler-icons";
import { theme, styled } from "../../theme";
import { ReactComponent as LOGO } from "./logo.svg";

interface HeaderBar {
  title: string;
  caption: string;
  backLink?: string;
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

  display: grid;
  grid-template-columns: 32px 1fr ${(p) =>
      p.actions > 0 && `repeat(${p.actions}, 32px)`} 32px;
  gap: 16px;
  align-items: center;

  #heading {
    padding: 2px 8px;
    height: 48px;
    #title {
      font: ${theme.fonts.title};
      color: ${theme.colors.primary};
      padding: 4px 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    #caption {
      font: ${theme.fonts.subtext};
      color: ${theme.colors.secondary};
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .icon {
    height: 32px;
    text-align: center;
    color: ${theme.colors.secondary};
  }
`;

const HeaderBar = (props: HeaderBar) => {
  const { title, caption, backLink, action } = props;
  return (
    <StyledHeaderBar actions={action ? 1 : 0}>
      <Link to={backLink || "/"} className="icon">
        {backLink ? <IconArrowLeft /> : <LOGO title="BucketPipes" />}
      </Link>
      <div id="heading">
        <div id="caption">{caption}</div>
        <div id="title">{title}</div>
      </div>
      {action && (
        <div className="icon">
          <IconFilter />
        </div>
      )}
      <div className="icon">
        <IconSettings />
      </div>
    </StyledHeaderBar>
  );
};

export { HeaderBar };
