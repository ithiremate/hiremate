import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { JOBS_NEW } from "../../../../utils/constants/routes";
import { editExistedJob } from "../../../../store/actions/jobsActions";

import LoadingContainer from "../../../containers/LoadingContainer";
import Button from "../../../shared/Button";
import FilterableTabs from "../../../shared/FilterableTabs";
import Job from "./molecules/Job";

import styles from "./index.module.scss";
import POST_JOB from "../../../../utils/constants/postJob";

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

        <FilterableTabs
          tabs={[
            {
              label: "all",
            },
            {
              label: "published",
              filterKey: "status",
              filterValue: POST_JOB.STATUS_TYPES.PUBLISHED,
            },
            {
              label: "draft",
              filterKey: "status",
              filterValue: POST_JOB.STATUS_TYPES.DRAFT,
            },
            {
              label: "archived",
              filterKey: "status",
              filterValue: POST_JOB.STATUS_TYPES.ARCHIVED,
            },
          ]}
          items={list}
          itemComponent={Job}
          itemsContainerClassName={styles.jobs}
          itemComponentProps={{ editJob }}
          itemComponentDynamicProps={(job) => ({ id: job.id, job })}
        />
      </div>
    </LoadingContainer>
  );
}

export default Jobs;
