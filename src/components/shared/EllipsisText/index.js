/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./index.module.scss";

function EllipsisText({ text, lines }) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => setShowFullText(!showFullText);

  const displayText = showFullText
    ? text
    : `${text.split("\n").slice(0, lines).join("\n").trim()}...`;

  return (
    <div className={styles.container}>
      <span className={styles.text}>{displayText}</span>

      <span role="button" className={styles.readMore} onClick={toggleText}>
        {showFullText ? "Read Less" : "Read More"}
      </span>
    </div>
  );
}

EllipsisText.propTypes = {
  text: PropTypes.string.isRequired,
  lines: PropTypes.number.isRequired,
};

export default EllipsisText;
