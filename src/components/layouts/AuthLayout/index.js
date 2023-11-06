import styles from "./index.module.scss";

function AuthLayout({ children }) {
  return <main className={styles.container}>{children}</main>;
}

export default AuthLayout;
