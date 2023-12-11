import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import MODAL from "../../../utils/constants/modal";
import useOnClickOutside from "../../../hooks/useClickOutside";
import { hideModal } from "../../../store/slices/modalSlice";

import SvgButton from "../../shared/SvgButton";
import DeleteJobModal from "./modals/DeleteJobModal";
import JobAutoscreeningModal from "./modals/JobAutoscreeningModal";

import styles from "./index.module.scss";

const MODALS_BY_TYPE = {
  [MODAL.MODAL_TYPES.DELETE_JOB]: DeleteJobModal,
  [MODAL.MODAL_TYPES.JOB_AUTOSCREENING]: JobAutoscreeningModal,
};

function Modal({ type, data }) {
  const Component = MODALS_BY_TYPE[type] ?? "div";

  return <Component data={data} />;
}

function ModalContainer({ children }) {
  const dispatch = useDispatch();

  const { currentTheme } = useSelector((state) => state.theme);
  const { type, data } = useSelector((state) => state.modal);

  const [internalType, setInternalType] = useState(type);
  const [internalData, setInternalData] = useState(data);

  const outsideRef = useRef(null);

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  useOnClickOutside(outsideRef, handleCloseModal);

  useEffect(() => {
    if (type) {
      setInternalType(type);
      setInternalData(data);
    } else {
      setTimeout(() => {
        setInternalType(type);
        setInternalData(data);
      }, 300);
    }
  }, [type]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.container_active]: internalType,
      })}>
      {children}

      <div
        className={classNames(styles.modal, {
          [styles.modal_active]: internalType,
          [styles[`modal_active_${currentTheme}`]]: internalType,
        })}>
        <div
          ref={outsideRef}
          className={classNames(
            styles.content,
            styles[`content_${currentTheme}`],
            {
              [styles.content_active]: type,
            },
          )}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>
              {MODAL.TITLES_BY_TYPE[internalType]}
            </span>

            <SvgButton
              icon="cross"
              className={styles.closeIcon}
              onClick={handleCloseModal}
            />
          </div>

          <Modal type={internalType} data={internalData} />
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.oneOf([null])]),
};

Modal.defaultProps = {
  data: null,
};

export default ModalContainer;
