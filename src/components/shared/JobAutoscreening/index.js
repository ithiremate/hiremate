/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import MODAL from "../../../utils/constants/modal";
import { showModal } from "../../../store/slices/modalSlice";

import Button from "../Button";

import styles from "./index.module.scss";

function JobAutoscreening({ questions }) {
  const dispatch = useDispatch();

  const { currentTheme } = useSelector((state) => state.theme);

  const [internalQuestions, setInternalQuestions] = useState(questions);

  const submitQuestionsModal = (newQuestions) => {
    console.log(newQuestions);
  };

  const showQuestionsModal = () =>
    dispatch(
      showModal({
        type: MODAL.MODAL_TYPES.JOB_AUTOSCREENING,
        data: { questions: internalQuestions, onSubmit: submitQuestionsModal },
      }),
    );

  return (
    <div className={styles.container}>
      <p className={classNames(styles.label, styles[`label_${currentTheme}`])}>
        Autoscreening
      </p>

      {internalQuestions.length ? (
        ""
      ) : (
        <p className={styles.emptyMessage}>No questions added</p>
      )}

      <Button label="add question" onClick={showQuestionsModal} />
    </div>
  );
}

JobAutoscreening.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default JobAutoscreening;
