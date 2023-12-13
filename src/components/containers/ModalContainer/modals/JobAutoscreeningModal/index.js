/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";

import POST_JOB from "../../../../../utils/constants/postJob";
import { hideModal } from "../../../../../store/slices/modalSlice";

import Select from "../../../../shared/Select";
import Button from "../../../../shared/Button";
import Input from "../../../../shared/Input";
import Answers from "./molecules/Answers";

import styles from "./index.module.scss";

function JobAutoscreeningModal() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.modal);
  const { currentTheme } = useSelector((state) => state.theme);

  const [internalQuestions, setInternalQuestions] = useState(data?.questions);
  const [questionType, setQuestionType] = useState({ value: "", label: "" });

  const handleSubmit = () => {
    data.onSubmit({ questions: [{ value: "SUBMITTED!" }] });
    dispatch(hideModal());
  };

  const handleQuestionTypeChange = ({ value }) => {
    setQuestionType(value);
  };

  const handleAddQuestion = () => {
    const blankQuestion = {
      ...POST_JOB.AUTOSCREENING_DEFAULT_QUESTIONS[questionType.value],
      type: questionType.value,
      id: nanoid(),
    };

    setInternalQuestions((prev) => [...prev, blankQuestion]);
  };

  const handleDeleteQuestion = (id) => () => {
    setInternalQuestions((prev) => prev.filter((el) => el.id !== id));
  };

  const handleQuestionInputChange =
    (id) =>
    ({ value }) => {
      const updatedQuestions = structuredClone(internalQuestions);
      const questionIndex = updatedQuestions.findIndex((el) => el.id === id);
      const question = updatedQuestions[questionIndex];

      question.question = value;
      updatedQuestions[questionIndex] = question;

      setInternalQuestions(updatedQuestions);
    };

  const handleAnswerAdd = (id) => () => {
    const updatedQuestions = structuredClone(internalQuestions);
    const questionIndex = updatedQuestions.findIndex((el) => el.id === id);
    const question = updatedQuestions[questionIndex];

    question.answers.push(
      POST_JOB.AUTOSCREENING_DEFAULT_ANSWERS[question.type],
    );

    updatedQuestions[questionIndex] = question;

    setInternalQuestions(updatedQuestions);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={classNames(
            styles.questions,
            styles[`questions_${currentTheme}`],
          )}>
          {internalQuestions.length ? (
            internalQuestions.map((question, index) => {
              const { id, type, question: questionText } = question;

              return (
                <div
                  key={id}
                  className={classNames(
                    styles.question,
                    styles[`question_${currentTheme}`],
                  )}>
                  <Input
                    label={`Question ${index + 1}`}
                    placeholder="Type question text"
                    labelButton="basket"
                    value={questionText}
                    showErrorMessage={false}
                    onChange={handleQuestionInputChange(id)}
                    onLabelButtonClick={handleDeleteQuestion(id)}
                    isRequired
                  />

                  <Answers
                    question={question}
                    onAnswerAdd={handleAnswerAdd(id)}
                  />
                </div>
              );
            })
          ) : (
            <span className={styles.blankMessage}>No questions added</span>
          )}
        </div>

        <div className={styles.newQuestionContainer}>
          <Select
            label="Chose question type"
            placeholder="Question type"
            options={POST_JOB.AUTOSCREENING_QUESTIONS_OPTIONS}
            value={questionType}
            errorMessage="asdasd"
            onChange={handleQuestionTypeChange}
            isRequired
          />

          <Button
            label="add question"
            disabled={!questionType.value}
            onClick={handleAddQuestion}
          />
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
