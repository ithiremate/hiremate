import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { nanoid } from "@reduxjs/toolkit";

import styles from "./index.module.scss";

function DummyItems() {
  return (
    <div className={styles.dummyContainer}>
      <p>No data to display</p>
    </div>
  );
}

function FilterableTabs({
  tabs,
  items,
  itemComponent: ItemComponent,
  itemsContainerClassName,
  itemComponentProps,
  itemComponentDynamicProps,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const filteredItems = useMemo(() => {
    if (activeTab.filterKey && activeTab.filterValue) {
      return items.filter(
        (item) => item[activeTab.filterKey] === activeTab.filterValue,
      );
    }

    return items;
  }, [activeTab, items]);

  return (
    <div className={styles.container}>
      <div className={classNames(styles.tabs, styles[`tabs_${currentTheme}`])}>
        {tabs.map((tab) => {
          const isActive = tab.label === activeTab.label;

          return (
            <button
              key={tab.label}
              type="button"
              tabIndex={-1}
              onClick={() => setActiveTab(tab)}
              className={classNames(styles.tab, styles[`tab_${currentTheme}`], {
                [styles[`tab_${currentTheme}_active`]]: isActive,
              })}>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {filteredItems.length > 0 && (
        <div className={classNames(styles.items, itemsContainerClassName)}>
          {filteredItems.map((item) => {
            return (
              <ItemComponent
                key={nanoid()}
                {...itemComponentProps}
                {...itemComponentDynamicProps(item)}
              />
            );
          })}
        </div>
      )}

      {filteredItems.length === 0 && <DummyItems />}
    </div>
  );
}

FilterableTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      filterKey: PropTypes.string,
      filterValue: PropTypes.string,
    }),
  ).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  itemComponent: PropTypes.elementType.isRequired,
  itemsContainerClassName: PropTypes.string,
  itemComponentProps: PropTypes.shape({}),
  itemComponentDynamicProps: PropTypes.func,
};

FilterableTabs.defaultProps = {
  itemsContainerClassName: "",
  itemComponentProps: {},
  itemComponentDynamicProps: () => ({}),
};

export default FilterableTabs;
