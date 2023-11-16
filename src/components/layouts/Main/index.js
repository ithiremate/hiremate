import { useState } from "react";

import Header from "../../base/Header";
import SideMenu from "../../base/SideMenu";

import styles from "./index.module.scss";

function MainLayout({ children }) {
  const [isMenuVisible, setIsMenuVissible] = useState(false);

  const handleMenuToggle = (isVisible) => () => {
    setIsMenuVissible(isVisible);
  };

  return (
    <div className={styles.container}>
      <Header isMenuVisible={isMenuVisible} onMenuToggle={handleMenuToggle} />

      <main className={styles.content}>
        <SideMenu isVisible={isMenuVisible} onClose={handleMenuToggle(false)} />

        {children}
      </main>
    </div>
  );
}

export default MainLayout;
