import Logo from "../../shared/Logo";

import styles from "./index.module.scss";

function AuthLayout({ children }) {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <Logo type="default" />

        {children}
      </section>
    </main>
  );
}

export default AuthLayout;
