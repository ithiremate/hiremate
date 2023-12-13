import PropTypes from "prop-types";

import POST_JOB from "../../../../../../../utils/constants/postJob";

import Button from "../../../../../../shared/Button";

import styles from "./index.module.scss";

function OneCorrectAnswer({ question, onAnswerAdd }) {
  return (
    <div className={styles.container}>
      <span>Write the options and mark the correct answer</span>

      <div className={styles.answers}>
        {question.answers.length ? (
          <></>
        ) : (
          <span className={styles.blankMessage}>No options added</span>
        )}
      </div>

      <Button onClick={onAnswerAdd} label="add option" />
    </div>
  );
}

const COMPONENTS_BY_TYPE = {
  [POST_JOB.AUTOSCREENING_QUESTION_TYPES.ONE_RIGHT_ANSWER]: OneCorrectAnswer,
};

function Answers({ question, onAnswerAdd }) {
  const Component = COMPONENTS_BY_TYPE[question.type] ?? "div";

  return <Component question={question} onAnswerAdd={onAnswerAdd} />;
}

Answers.propTypes = {
  onAnswerAdd: PropTypes.func,
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

Answers.defaultProps = {
  onAnswerAdd: () => {},
};

OneCorrectAnswer.propTypes = {
  onAnswerAdd: PropTypes.func,
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

OneCorrectAnswer.defaultProps = {
  onAnswerAdd: () => {},
};

export default Answers;
