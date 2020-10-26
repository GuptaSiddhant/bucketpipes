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
  default: white,
  inverse: black,
  none: "transparent",
};

const shadows = {
  none: `none`,
  large: `0 4px 16px 0 rgba(0,0,0,0.10)`,
  medium: `0 2px 8px 0 rgba(0,0,0,0.10)`,
  small: `0 1px 4px 0 rgba(0,0,0,0.10)`,
};

const fonts = {
  body: `400 16px/20px Metropolis`,
  bodyLink: `500 16px/20px Metropolis`,
  note: `400 12px/16px Metropolis`,
  subtext: `500 12px/16px Metropolis`,
  title: `500 20px/24px Metropolis`,
  code: `400 12px/16px FiraCode`,
};

export const theme = {
  colors,
  shadows,
  fonts,
};

export { default as styled } from "styled-components";
