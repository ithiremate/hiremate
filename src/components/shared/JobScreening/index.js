/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";

function JobScreening({ questions }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [internalQuestions, setInternalQuestions] = useState(questions);

  return (
    <div className={styles.container}>
      <p className={classNames(styles.label, styles[`label_${currentTheme}`])}>
        Autoscreening
      </p>
    </div>
  );
}

JobScreening.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default JobScreening;
