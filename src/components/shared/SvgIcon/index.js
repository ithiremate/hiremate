import PropTypes from "prop-types";

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

function SvgIcon({ type, className }) {
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
  };

  const SVG_BY_TYPE = {
    ...LOGO,
    ...BASE,
  };

  const Component = SVG_BY_TYPE[type] ?? "svg";

  return <Component className={className} />;
}

SvgIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SvgIcon.defaultProps = {
  className: "",
};

export default SvgIcon;