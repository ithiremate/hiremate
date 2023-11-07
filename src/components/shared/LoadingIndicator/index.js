import PropTypes from "prop-types";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

import THEME from "../../../utils/constants/theme";

function LoadingIndicator({
  width,
  height,
  strokeWidth,
  strokeWidthSecondary,
}) {
  const { currentTheme } = useSelector((state) => state.theme);
  const colors = THEME.COLORS_BY_THEME[currentTheme] ?? THEME.DEFAULT_COLORS;

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
  width: 30,
  height: 30,
  strokeWidth: 8,
  strokeWidthSecondary: 4,
};

export default LoadingIndicator;
