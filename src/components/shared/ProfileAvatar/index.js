import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";

import SvgIcon from "../SvgIcon";
import PresenseIndicator from "./molecules/PresenseIndicator";

import styles from "./index.module.scss";

function ProfileAvatar({ photoUrl }) {
  const { currentTheme } = useSelector((state) => state.theme);
  const { dbUser } = useSelector((state) => state.user);

  return (
    <div
      className={classNames(
        styles.container,
        styles[`container_${currentTheme}`],
      )}>
      {photoUrl ? <img src={photoUrl} alt="user" /> : <SvgIcon type="user" />}

      <PresenseIndicator
        presenseStatus={dbUser.presenseStatus}
        currentTheme={currentTheme}
      />
    </div>
  );
}

ProfileAvatar.propTypes = {
  photoUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

ProfileAvatar.defaultProps = {
  photoUrl: null,
};

export default ProfileAvatar;
