import React from "react";
import { styled, theme } from "../../theme";

interface ListItem {
  uid: string;
  primaryText: string;
  secondaryText?: string;
  leadingIcon?: React.ReactChild;
  trailingIcon?: React.ReactChild;
  isActive?: boolean;
}

const StyledListItem = styled.li`
  border-radius: 4px;
  background: ${theme.colors.none};
  padding: 8px;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 16px;
`;

const ListItem = (props: ListItem) => {
  const { leadingIcon, trailingIcon, primaryText, secondaryText } = props;
  return (
    <StyledListItem>
      <div className="leading">{leadingIcon}</div>
      <div></div>
    </StyledListItem>
  );
};

export { ListItem };
