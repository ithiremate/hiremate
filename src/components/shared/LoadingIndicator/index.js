import PropTypes from "prop-types";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import THEME from "../../../utils/constants/theme";

const DEFAULT_COLORS = {
  color: "#2b2b2b",
  secondaryColor: "rgba($color: #2b2b2b, $alpha: 0.8)",
};

const COLORS_BY_THEME = {
  [THEME.THEME_LIGHT]: {
    color: "#2b2b2b",
    secondaryColor: "rgba($color: #2b2b2b, $alpha: 0.8)",
  },
  [THEME.THEME_DARK]: {
    color: "#e4e2dd",
    secondaryColor: "rgba($color: #e4e2dd, $alpha: 0.8)",
  },
};

function LoadingIndicator({
  width,
  height,
  strokeWidth,
  strokeWidthSecondary,
}) {
  const { currentTheme } = useSelector((state) => state.theme);
  const colors = COLORS_BY_THEME[currentTheme] ?? DEFAULT_COLORS;

  return (
    <Oval
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      strokeWidthSecondary={strokeWidthSecondary}
      ariaLabel="oval-loading"
      {...colors}
    />
  );
}

LoadingIndicator.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeWidthSecondary: PropTypes.number,
};

LoadingIndicator.defaultProps = {
  width: 40,
  height: 40,
  strokeWidth: 8,
  strokeWidthSecondary: 4,
};

export default LoadingIndicator;
