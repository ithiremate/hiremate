const THEME_KEY = "THEME_KEY";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

const COLORS_BY_THEME = {
  [THEME_LIGHT]: {
    color: "#2b2b2b",
    secondaryColor: "rgba($color: #2b2b2b, $alpha: 0.8)",
  },
  [THEME_DARK]: {
    color: "#e4e2dd",
    secondaryColor: "rgba($color: #e4e2dd, $alpha: 0.8)",
  },
};

const COLORS_BY_THEME_REVERTED = {
  [THEME_LIGHT]: {
    color: "#e4e2dd",
    secondaryColor: "rgba($color: #e4e2dd, $alpha: 0.8)",
  },
  [THEME_DARK]: {
    color: "#2b2b2b",
    secondaryColor: "rgba($color: #2b2b2b, $alpha: 0.8)",
  },
};

const DEFAULT_COLORS = {
  color: "#2b2b2b",
  secondaryColor: "rgba($color: #2b2b2b, $alpha: 0.8)",
};

const THEME = {
  THEME_KEY,
  THEME_LIGHT,
  THEME_DARK,
  COLORS_BY_THEME,
  COLORS_BY_THEME_REVERTED,
  DEFAULT_COLORS,
};

export default THEME;
