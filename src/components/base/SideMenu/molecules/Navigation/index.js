/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useLocation, matchPath } from "react-router-dom";

import SvgIcon from "../../../../shared/SvgIcon";
import CustomNavLink from "../../../../shared/CustomNavLink";

import styles from "./index.module.scss";

function LinkComponent({
  isActive,
  hasNested,
  isExpanded,
  currentTheme,
  title,
  icon,
  to,
  onClick,
}) {
  if (isActive || hasNested) {
    return (
      <div
        onClick={onClick}
        className={classNames(
          styles.linkContainer,
          styles[`linkContainer_${currentTheme}`],
          {
            [styles.linkContainer_active]: isActive,
            [styles.linkContainer_expanded]: isExpanded,
            [styles[`linkContainer_${currentTheme}_active`]]: isActive,
          },
        )}>
        <div className={styles.linkContainer_left}>
          {icon && <SvgIcon type={icon} />}
          {title}
        </div>

        {hasNested && <SvgIcon type="chevron" className={styles.icon} />}
      </div>
    );
  }

  return (
    <CustomNavLink
      label={title}
      icon={icon}
      to={to}
      className={classNames(styles.link, styles[`link_${currentTheme}`], {
        [styles[`link_${currentTheme}_active`]]: isActive,
      })}
    />
  );
}

function Navigation({ routes }) {
  const { currentTheme } = useSelector((state) => state.theme);
  const { pathname } = useLocation();

  const [internalRoutes, setInternalRoutes] = useState(structuredClone(routes));

  const toggleRoute = (routePath) => () => {
    setInternalRoutes((prev) => ({
      ...prev,
      [routePath]: {
        ...prev[routePath],
        isExpanded: !prev[routePath].isExpanded,
      },
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {Object.entries(internalRoutes).map(([routePath, routeContent]) => {
          const { title, icon, nested } = routeContent;
          const isActive = !!matchPath(pathname, routePath);
          const isExpanded = !!internalRoutes[routePath].isExpanded;

          return (
            <div key={routePath} className={styles.navItem}>
              <LinkComponent
                isActive={isActive}
                hasNested={!!nested}
                isExpanded={isExpanded}
                currentTheme={currentTheme}
                title={title}
                icon={icon}
                to={routePath}
                onClick={toggleRoute(routePath)}
              />

              {nested && (
                <div
                  className={classNames(styles.nested, {
                    [styles.nested_expanded]: isExpanded,
                  })}>
                  <Navigation routes={nested} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Navigation.propTypes = {
  routes: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      nested: PropTypes.oneOfType([
        PropTypes.shape({
          [PropTypes.string]: PropTypes.shape({
            title: PropTypes.string.isRequired,
            icon: PropTypes.string,
          }),
        }),
        PropTypes.oneOf([undefined]),
      ]),
    }),
  }).isRequired,
};

LinkComponent.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hasNested: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  currentTheme: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Navigation;
