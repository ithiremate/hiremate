import styles from "./index.module.scss";

function WizardLayout({ children }) {
  return (
    <main className={styles.container}>
      <section className={styles.content}>{children}</section>
    </main>
  );
}

export default WizardLayout;
