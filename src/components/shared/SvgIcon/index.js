import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";

// LOGO
import { ReactComponent as LogoLightSmall } from "../../../assets/icons/logo_light_small.svg";
import { ReactComponent as LogoLightDefault } from "../../../assets/icons/logo_light_default.svg";
import { ReactComponent as LogoLightFull } from "../../../assets/icons/logo_light_full.svg";
import { ReactComponent as LogoDarkSmall } from "../../../assets/icons/logo_dark_small.svg";
import { ReactComponent as LogoDarkDefault } from "../../../assets/icons/logo_dark_default.svg";
import { ReactComponent as LogoDarkFull } from "../../../assets/icons/logo_dark_full.svg";

// BASE
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import { ReactComponent as Unlock } from "../../../assets/icons/unlock.svg";
import { ReactComponent as Menu } from "../../../assets/icons/menu.svg";
import { ReactComponent as Cross } from "../../../assets/icons/cross.svg";
import { ReactComponent as User } from "../../../assets/icons/user.svg";
import { ReactComponent as Chevron } from "../../../assets/icons/chevron.svg";
import { ReactComponent as Checked } from "../../../assets/icons/checked.svg";
import { ReactComponent as Unchecked } from "../../../assets/icons/unchecked.svg";
import { ReactComponent as Pin } from "../../../assets/icons/pin.svg";
import { ReactComponent as Clock } from "../../../assets/icons/clock.svg";
import { ReactComponent as Options } from "../../../assets/icons/options.svg";
import { ReactComponent as Edit } from "../../../assets/icons/edit.svg";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";

// SIDE MENU
import { ReactComponent as Case } from "../../../assets/icons/case.svg";
import { ReactComponent as Grid } from "../../../assets/icons/grid.svg";

import styles from "./index.module.scss";

function SvgIcon({ type, onClick, className, fill }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const LOGO = {
    logo_light_small: LogoLightSmall,
    logo_dark_small: LogoDarkSmall,
    logo_light_default: LogoLightDefault,
    logo_dark_default: LogoDarkDefault,
    logo_light_full: LogoLightFull,
    logo_dark_full: LogoDarkFull,
  };

  const BASE = {
    lock: Lock,
    unlock: Unlock,
    menu: Menu,
    cross: Cross,
    user: User,
    chevron: Chevron,
    checked: Checked,
    unchecked: Unchecked,
    pin: Pin,
    clock: Clock,
    options: Options,
    edit: Edit,
    delete: Delete,
  };

  const SIDE_MENU = {
    case: Case,
    grid: Grid,
  };

  const SVG_BY_TYPE = {
    ...LOGO,
    ...BASE,
    ...SIDE_MENU,
  };

  const Component = SVG_BY_TYPE[type] ?? "svg";

  return (
    <Component
      className={classNames(
        { [styles[`icon_${currentTheme}`]]: fill },
        className,
      )}
      onClick={onClick}
    />
  );
}

SvgIcon.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  fill: PropTypes.bool,
};

SvgIcon.defaultProps = {
  onClick: () => {},
  className: "",
  fill: true,
};

export default SvgIcon;
