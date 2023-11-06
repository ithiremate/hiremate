import styles from "./index.module.scss";

function SignIn({ children }) {
  return <section className={styles.container}>{children}</section>;
}

export default SignIn;
