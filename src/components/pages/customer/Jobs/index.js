import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { JOBS_NEW } from "../../../../utils/constants/routes";
import { editExistedJob } from "../../../../store/actions/jobsActions";

import LoadingContainer from "../../../containers/LoadingContainer";
import Button from "../../../shared/Button";
import Job from "./molecules/Job";

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
  const dispatch = useDispatch();

  const { list, isInitialized } = useSelector((state) => state.jobs);

  const editJob = (job) => async () => {
    await dispatch(editExistedJob(job));
  };

  if (isInitialized && list.length === 0) {
    return <DummyJobs />;
  }

  return (
    <LoadingContainer isLoading={!isInitialized}>
      <div className={styles.container}>
        <h1 className={styles.title}>Jobs</h1>

        <div className={styles.jobs}>
          {list.map((job) => (
            <Job key={job.id} id={job.id} job={job} editJob={editJob} />
          ))}
        </div>
      </div>
    </LoadingContainer>
  );
}

export default Jobs;
