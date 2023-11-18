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
          const isCurrentRoute = !!matchPath(pathname, routePath);

          return (
            <div
              key={routePath}
              className={classNames(styles.linkContainer, {
                [styles.linkContainer_empty]: !nested,
              })}>
              <div
                className={classNames(styles.linkTitleContainer, {
                  [styles.linkTitleContainer_withNested]: nested,
                })}>
                <CustomNavLink
                  to={routePath}
                  label={title}
                  icon={icon}
                  className={classNames(
                    styles.link,
                    styles[`link_${currentTheme}`],
                    {
                      [styles.link_full]: !nested,
                      [styles.link_withoutIcon]: !icon,
                    },
                  )}
                />

                {nested && (
                  <div
                    className={styles.iconContainer}
                    onClick={toggleRoute(routePath)}>
                    <SvgIcon
                      type="chevron"
                      className={classNames(
                        styles.icon,
                        styles[`icon_${currentTheme}`],
                        {
                          [styles[`icon_active_${currentTheme}`]]:
                            isCurrentRoute,
                        },
                      )}
                    />
                  </div>
                )}
              </div>

              {nested && (
                <div
                  className={classNames(styles.nested, {
                    [styles.nested_visible]:
                      internalRoutes[routePath].isExpanded,
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

export default Navigation;
