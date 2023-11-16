import { useState } from "react";
import Header from "../../base/Header";

import styles from "./index.module.scss";

function MainLayout({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [isMenuVisible, setIsMenuVissible] = useState(false);

  const handleMenuToggle = (isVisible) => () => {
    setIsMenuVissible(isVisible);
  };

  return (
    <div className={styles.container}>
      <Header onMenuToggle={handleMenuToggle} />

      <main className={styles.content}>{children}</main>
    </div>
  );
}

export default MainLayout;
