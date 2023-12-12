/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import POST_JOB from "../../../../../utils/constants/postJob";
import { hideModal } from "../../../../../store/slices/modalSlice";

import Select from "../../../../shared/Select";
import Button from "../../../../shared/Button";

import styles from "./index.module.scss";

function JobAutoscreeningModal() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.modal);

  const [internalQuestions, setInternalQuestions] = useState(data?.questions);
  const [questionType, setQuestionType] = useState({ value: "", label: "" });

  const handleSubmit = () => {
    data.onSubmit({ questions: [{ value: "SUBMITTED!" }] });
    dispatch(hideModal());
  };

  const handleQuestionTypeChange = ({ value }) => {
    setQuestionType(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.newQuestionContainer}>
          <Select
            label="Chose question type"
            placeholder="Question type"
            options={POST_JOB.AUTOSCREENING_QUESTIONS_OPTIONS}
            value={questionType}
            onChange={handleQuestionTypeChange}
            isRequired
          />

          <Button label="add question" />
        </div>
      </div>

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
