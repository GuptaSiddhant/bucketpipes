import React from "react";
import { Link } from "react-router-dom";
import { styled, theme } from "../../theme";

interface ListItem {
  uid: string;
  primaryText: string;
  secondaryText?: string;
  leadingIcon?: React.ReactChild;
  trailingIcon?: React.ReactChild;
  isActive?: boolean;
  link?: string;
  contained?: boolean;
}

const StyledListItem = styled.li`
  border-radius: 4px;
  background: ${theme.colors.none};
  padding: 8px;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.hover};
  margin-bottom: 4px;
  overflow: hidden;

  :hover {
    background: ${theme.colors.hover};
  }

  .leading {
    width: 32px;
    height: 32px;
  }
  .text {
    ${theme.css.truncateText};

    .primary {
      color: ${theme.colors.secondary};
      font: ${theme.fonts.bodyLink};
      ${theme.css.truncateText};
    }

    .secondary {
      margin-top: 4px;
      color: ${theme.colors.tertiary};
      font: ${theme.fonts.note};
      ${theme.css.truncateText};
    }
  }
`;

const ListItem = (props: ListItem) => {
  const {
    leadingIcon,
    trailingIcon,
    contained,
    primaryText,
    secondaryText,
    link,
  } = props;
  const item = (
    <StyledListItem
      style={{
        background: contained ? theme.colors.default : theme.colors.none,
        boxShadow: contained ? theme.shadows.medium : theme.shadows.none,
      }}
    >
      <div className="leading">{leadingIcon}</div>
      <div className="text">
        <div className="primary">{primaryText}</div>
        <div className="secondary">{secondaryText}</div>
      </div>
      {trailingIcon && <div className="trailing">{trailingIcon}</div>}
    </StyledListItem>
  );

  return link ? (
    <Link to={link} style={{ textDecoration: "none" }}>
      {item}
    </Link>
  ) : (
    item
  );
};

export { ListItem };
