import PropTypes from "prop-types";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

import THEME from "../../../utils/constants/theme";

function LoadingIndicator({
  reverted,
  width,
  height,
  strokeWidth,
  strokeWidthSecondary,
  className,
}) {
  const { currentTheme } = useSelector((state) => state.theme);
  const colors = reverted
    ? THEME.COLORS_BY_THEME_REVERTED[currentTheme]
    : THEME.COLORS_BY_THEME[currentTheme] ?? THEME.DEFAULT_COLORS;

  return (
    <Oval
      wrapperClass={className}
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
  reverted: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeWidthSecondary: PropTypes.number,
  className: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  reverted: false,
  width: 30,
  height: 30,
  strokeWidth: 8,
  strokeWidthSecondary: 4,
  className: "",
};

export default LoadingIndicator;
