export const Colors = {
  primary: "#002395",
  secondary: "#FF0020",
  text: "#909090",
  accent: "#031C64",
  success: "#0FB53D",
  dark: "#4C4C4C",
  red: "#ED2939",
  black: "#000000",
  white: "#ffffff",
  silver: "#F1F1F1",
  darkSilver: "#D7D7D7",
  grey: "#939393",
  background: "#FFFFFF",
  transparent: "rgba(0,0,0,0)",
} as const;

export type ColorsType = typeof Colors;
