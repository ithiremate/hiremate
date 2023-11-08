const THEME_TYPE_KEY = "THEME_TYPE_KEY";
const THEME_LIGHT_TYPE = "light";
const THEME_DARK_TYPE = "dark";

const COLORS_BY_THEME = {
  [THEME_LIGHT_TYPE]: {
    color: "#2b2b2b",
    secondaryColor: "rgba($color: #2b2b2b, $alpha: 0.8)",
  },
  [THEME_DARK_TYPE]: {
    color: "#e4e2dd",
    secondaryColor: "rgba($color: #e4e2dd, $alpha: 0.8)",
  },
};

const COLORS_BY_THEME_REVERTED = {
  [THEME_LIGHT_TYPE]: {
    color: "#e4e2dd",
    secondaryColor: "rgba($color: #e4e2dd, $alpha: 0.8)",
  },
  [THEME_DARK_TYPE]: {
    color: "#2b2b2b",
    secondaryColor: "rgba($color: #2b2b2b, $alpha: 0.8)",
  },
};

const DEFAULT_COLORS = {
  color: "#2b2b2b",
  secondaryColor: "rgba($color: #2b2b2b, $alpha: 0.8)",
};

const THEME = {
  THEME_TYPE_KEY,
  THEME_LIGHT_TYPE,
  THEME_DARK_TYPE,
  COLORS_BY_THEME,
  COLORS_BY_THEME_REVERTED,
  DEFAULT_COLORS,
};

export default THEME;
