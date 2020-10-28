import styled from "styled-components";

const white = "#FFFFFF",
  black = "#000D1A";

const colors = {
  primary: "#012345",
  secondary: "#004D99",
  tertiary: "#779FC8",
  negative: "#F44336",
  positive: "#4CAF50",
  warning: "#FF9800",
  note: "#9C27B0",
  hover: "#F0F4F7",
  disabled: "#808080",
  default: white,
  inverse: black,
  none: "transparent",
} as const;

const shadows = {
  none: `none`,
  large: `0 4px 16px 0 rgba(0,0,0,0.20)`,
  medium: `0 2px 8px 0 rgba(0,0,0,0.20)`,
  small: `0 1px 4px 0 rgba(0,0,0,0.20)`,
} as const;

const fonts = {
  body: `400 16px/20px Metropolis`,
  bodyLink: `500 16px/20px Metropolis`,
  note: `400 12px/16px Metropolis`,
  subtext: `500 14px/16px Metropolis`,
  title: `500 20px/24px Metropolis`,
  code: `400 12px/16px FiraCode`,
} as const;

const css = {
  truncateText: `max-width: calc(100%); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,
} as const;

const theme = {
  colors,
  shadows,
  fonts,
  css,
} as const;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export { styled, theme, Center };
