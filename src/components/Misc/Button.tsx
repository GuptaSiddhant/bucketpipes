import React from "react";
import { TablerIcon } from "tabler-icons";
import { styled, theme } from "../../theme";

interface IconButton {
  Icon: TablerIcon;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  contained?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Styled = styled.button<{ contained?: boolean; disabled?: boolean }>`
  border-radius: 4px;
  border: none;
  padding: 0;
  height: 32px;
  width: 32px;
  color: ${theme.colors.secondary};
  font: ${theme.fonts.bodyLink};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(p) => (p.disabled ? "inherit" : `pointer`)};
  box-shadow: ${(p) =>
    p.contained && !p.disabled ? theme.shadows.medium : theme.shadows.none};
  background: ${(p) =>
    p.disabled
      ? theme.colors.disabled
      : p.contained
      ? theme.colors.default
      : theme.colors.none};

  :hover {
    box-shadow: ${(p) =>
      p.contained && !p.disabled ? theme.shadows.large : theme.shadows.none};
  }

  svg {
    width: 24px;
    height: 24px;
  }

  span {
    margin: 0 8px;
  }
`;

const IconButton = ({
  Icon,
  color,
  onClick,
  title,
  contained,
  disabled,
  style,
}: IconButton) => {
  return (
    <Styled
      onClick={onClick}
      title={title}
      contained={contained}
      disabled={disabled}
      style={style}
    >
      <Icon color={color} size={24} />
    </Styled>
  );
};

const Button = React.forwardRef<HTMLButtonElement, IconButton>(
  ({ Icon, color, onClick, title, contained, disabled, style }, ref) => {
    return (
      <Styled
        ref={ref}
        onClick={onClick}
        title={title}
        contained={contained}
        style={{ width: "auto", padding: "4px 8px", ...style }}
        disabled={disabled}
      >
        <Icon color={color} size={24} />
        <span>{title || "Button"}</span>
      </Styled>
    );
  }
);

export { IconButton, Button };
