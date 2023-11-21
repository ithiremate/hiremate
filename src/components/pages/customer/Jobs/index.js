import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { JOBS_NEW } from "../../../../utils/constants/routes";

import LoadingContainer from "../../../containers/LoadingContainer";
import Button from "../../../shared/Button";

import styles from "./index.module.scss";

function DummyJobs() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jobs</h1>

      <div className={styles.dummyContent}>
        <p className={styles.dummyTitle}>Jobs not published</p>

        <Button label="post new job" onClick={() => navigate(JOBS_NEW)} />
      </div>
    </div>
  );
}

function Jobs() {
  const { list, isInitialized } = useSelector((state) => state.jobs);

  if (isInitialized && list.length === 0) {
    return <DummyJobs />;
  }

  return (
    <LoadingContainer isLoading={!isInitialized}>
      <div className={styles.container} />
    </LoadingContainer>
  );
}

export default Jobs;
