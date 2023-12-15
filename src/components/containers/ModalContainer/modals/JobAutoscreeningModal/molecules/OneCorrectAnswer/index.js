import PropTypes from "prop-types";
// import classNames from "classnames";

import Input from "../../../../../../shared/Input";
import Button from "../../../../../../shared/Button";

import styles from "./index.module.scss";

function OneCorrectAnswer({
  index,
  question,
  onDelete,
  onQuestionTextChange,
  onAnswerAdd,
  // onAnswerChange,
}) {
  // const handleAnswerChange =
  //   (answer) =>
  //   ({ value, valueKey }) => {
  //     onAnswerChange({ ...answer, [valueKey]: value });
  //   };

  return (
    <div className={styles.container}>
      <Input
        className={styles.input}
        label={`Question ${index + 1}`}
        placeholder="Enter question text"
        labelButton="basket"
        value={question.question}
        showErrorMessage={false}
        onChange={onQuestionTextChange}
        onLabelButtonClick={onDelete}
        isRequired
      />

      <div className={styles.bottom}>
        <div className={styles.answers}>
          <span className={styles.blankMessage}>
            Write the options and mark the correct answer
          </span>

          {question.answers.length ? (
            question.answers.map((answer) => {
              return <div key={answer.id}></div>;
            })
          ) : (
            <span className={styles.blankMessage}>No options added</span>
          )}
        </div>

        <Button onClick={onAnswerAdd} label="add option" />
      </div>
    </div>
  );
}

OneCorrectAnswer.propTypes = {
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onQuestionTextChange: PropTypes.func.isRequired,
  onAnswerAdd: PropTypes.func.isRequired,
  // onAnswerChange: PropTypes.func.isRequired,
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        answer: PropTypes.string.isRequired,
        isCorrect: PropTypes.bool.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default OneCorrectAnswer;
