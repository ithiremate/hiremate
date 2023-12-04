import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { deleteExistedJob } from "../../../../../store/actions/jobsActions";
import { hideModal } from "../../../../../store/slices/modalSlice";

import styles from "./index.module.scss";
import Button from "../../../../shared/Button";

function DeleteJobModal({ data }) {
  const dispatch = useDispatch();

  const [isLoading, sestIsLoading] = useState(false);

  const handleSubmit = async () => {
    sestIsLoading(true);
    await dispatch(deleteExistedJob(data.id));
    dispatch(hideModal());
  };

  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Are you sure you want to delete the {data.title} job?
      </p>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          label="Delete"
          isLoading={isLoading}
          onClick={handleSubmit}
        />

        <Button
          className={styles.button}
          label="Cancel"
          onClick={() => dispatch(hideModal())}
        />
      </div>
    </div>
  );
}

DeleteJobModal.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteJobModal;
