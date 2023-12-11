import { useDispatch, useSelector } from "react-redux";

import { hideModal } from "../../../../../store/slices/modalSlice";

import Button from "../../../../shared/Button";

import styles from "./index.module.scss";

function JobAutoscreeningModal() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.modal);

  const handleSubmit = () => {
    data.onSubmit({ questions: [{ value: "SUBMITTED!" }] });
    dispatch(hideModal());
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button className={styles.button} label="save" onClick={handleSubmit} />

        <Button
          className={styles.button}
          label="cancel"
          onClick={() => dispatch(hideModal())}
        />
      </div>
    </div>
  );
}

export default JobAutoscreeningModal;
