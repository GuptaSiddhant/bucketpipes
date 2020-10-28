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

const Styled = styled.button<{ contained?: boolean }>`
  border-radius: 4px;
  border: none;
  height: 32px;
  width: 32px;
  color: ${theme.colors.secondary};
  font: ${theme.fonts.bodyLink};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${(p) =>
    p.contained ? theme.shadows.medium : theme.shadows.none};
  background: ${(p) =>
    p.contained ? theme.colors.default : theme.colors.none};

  :hover {
    box-shadow: ${(p) =>
      p.contained ? theme.shadows.large : theme.shadows.none};
  }

  span {
    margin-left: 8px;
  }
`;

const IconButton = ({ Icon, color, onClick, title, contained }: IconButton) => {
  return (
    <Styled onClick={onClick} title={title} contained={contained}>
      <Icon color={color} size={24} stroke={2} />
    </Styled>
  );
};

const Button = ({ Icon, color, onClick, title, contained }: IconButton) => {
  return (
    <Styled
      onClick={onClick}
      title={title}
      contained={contained}
      style={{ width: "auto" }}
    >
      <Icon color={color} size={24} stroke={2} />
      <span>{title || "Button"}</span>
    </Styled>
  );
};

export { IconButton, Button };
