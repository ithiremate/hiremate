import Logo from "../../shared/Logo";

import styles from "./index.module.scss";

function AuthLayout({ children }) {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <Logo type="default" className={styles.logo} />

        {children}
      </section>
    </main>
  );
}

export default AuthLayout;
