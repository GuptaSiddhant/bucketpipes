import React from "react";
import { TablerIcon } from "tabler-icons";
import { styled, theme } from "../../theme";

interface IconButton {
  Icon: TablerIcon;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  contained?: boolean;
}

const Styled = styled.button`
  border-radius: 4px;
  border: none;
  height: 32px;
  width: 32px;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconButton = ({ Icon, color, onClick, title, contained }: IconButton) => {
  return (
    <Styled
      onClick={onClick}
      title={title}
      style={{
        boxShadow: contained ? theme.shadows.medium : "none",
        background: contained ? theme.colors.default : theme.colors.none,
      }}
    >
      <Icon color={color} />
    </Styled>
  );
};

export { IconButton };
