import React from "react";
import { Link } from "react-router-dom";
import { styled, theme } from "../../theme";

interface Pagination {
  uid: string;
  primaryText: string;
  secondaryText?: string;
  leadingIcon?: React.ReactChild;
  trailingIcon?: React.ReactChild;
  isActive?: boolean;
  link: string;
}

const StyledPagination = styled.li`
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

    img {
      width: 100%;
      height: 100%;
      border-radius: 2px;
      object-fit: contain;
    }
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

const Pagination = (props: Pagination) => {
  const { leadingIcon, trailingIcon, primaryText, secondaryText, link } = props;
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <StyledPagination>
        <div className="leading">{leadingIcon}</div>
        <div className="text">
          <div className="primary">{primaryText}</div>
          <div className="secondary">{secondaryText}</div>
        </div>
        {trailingIcon && <div className="trailing">{trailingIcon}</div>}
      </StyledPagination>
    </Link>
  );
};

export { Pagination };
