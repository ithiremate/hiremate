import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";
import dayjs from "dayjs";

import POST_JOB from "../../../../../../utils/constants/postJob";

import SvgIcon from "../../../../../shared/SvgIcon";
import Button from "../../../../../shared/Button";
import EllipsisText from "../../../../../shared/EllipsisText";

import styles from "./index.module.scss";

const prepareTags = (location, experienceFrom, experienceTo, workNature) => {
  const locationTitle = location.display_name.split(",")[0];
  const experienceTitle =
    experienceFrom === experienceTo
      ? `${experienceFrom} years`
      : `${experienceFrom}-${experienceTo} years`;
  const workNatureTitle = workNature
    .map((type) => POST_JOB.WORK_NATURE_TITLES[type])
    .join(" / ");

  return [
    { title: locationTitle, icon: "pin" },
    { title: experienceTitle, icon: "case" },
    { title: workNatureTitle, icon: "clock" },
  ];
};

const praparePostedTitle = (date) => {
  const now = dayjs();
  const posted = dayjs(date);
  const diffYears = now.diff(posted, "years");
  const diffMonths = now.diff(posted, "months");
  const diffWeeks = now.diff(posted, "weeks");
  const diffDays = now.diff(posted, "days");
  const diffHours = now.diff(posted, "hours");
  const diffMinutes = now.diff(posted, "minutes");
  const diffSeconds = now.diff(posted, "seconds");

  switch (true) {
    case diffYears > 0: {
      return `Posted ${diffYears} years ago`;
    }

    case diffMonths > 0: {
      return `Posted ${diffMonths} months ago`;
    }

    case diffWeeks > 0: {
      return `Posted ${diffWeeks} weeks ago`;
    }

    case diffDays > 0: {
      return `Posted ${diffDays} days ago`;
    }

    case diffHours > 0: {
      return `Posted ${diffHours} hours ago`;
    }

    case diffMinutes > 0: {
      return `Posted ${diffMinutes} minutes ago`;
    }

    default: {
      return `Posted ${diffSeconds} seconds ago`;
    }
  }
};

function Job({
  id,
  companyImage,
  title,
  companyName,
  location,
  experienceFrom,
  experienceTo,
  workNature,
  description,
  createdAt,
  salaryFrom,
  salaryTo,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const tags = prepareTags(location, experienceFrom, experienceTo, workNature);

  const postedTitle = praparePostedTitle(createdAt);

  const salaryTitle =
    salaryFrom === salaryTo
      ? `$${salaryFrom / 1000}K/mo`
      : `$${salaryFrom / 1000}-${salaryTo / 1000}K/mo`;

  return (
    <div
      key={id}
      className={classNames(
        styles.container,
        styles[`container_${currentTheme}`],
      )}>
      <div className={styles.top}>
        <div className={styles.jobHeader}>
          <div className={styles.left}>
            {companyImage ? (
              <img src={companyImage} alt="company" />
            ) : (
              <div
                className={classNames(
                  styles.companyImage,
                  styles[`companyImage_${currentTheme}`],
                )}>
                <SvgIcon type="user" />
              </div>
            )}

            <div className={styles.titleContainer}>
              <span className={styles.jobTitle}>{title}</span>
              <span className={styles.companyName}>{companyName}</span>
            </div>
          </div>

          <Button label="view" />
        </div>

        <div className={styles.jobBody}>
          <div className={styles.tags}>
            {tags.map((tag) => {
              return (
                <div
                  key={tag.title}
                  className={classNames(
                    styles.tag,
                    styles[`tag_${currentTheme}`],
                  )}>
                  <SvgIcon type={tag.icon} className={styles.tagIcon} />
                  <span className={styles.tagTitle}>{tag.title}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.descriptionContainer}>
            <EllipsisText text={description} lines={2} />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          styles.jobFooter,
          styles[`jobFooter_${currentTheme}`],
        )}>
        <div className={styles.left}>
          <SvgIcon type="clock" />

          <span>{postedTitle}</span>
        </div>

        <p className={styles.salary}>{salaryTitle}</p>
      </div>
    </div>
  );
}

Job.propTypes = {
  id: PropTypes.string.isRequired,
  companyImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  experienceFrom: PropTypes.number.isRequired,
  experienceTo: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  salaryFrom: PropTypes.number.isRequired,
  salaryTo: PropTypes.number.isRequired,
  workNature: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  location: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
  }).isRequired,
};

Job.defaultProps = {
  companyImage: "",
};

export default Job;
