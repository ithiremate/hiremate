import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import MODAL from "../../../utils/constants/modal";
import useOnClickOutside from "../../../hooks/useClickOutside";
import { hideModal } from "../../../store/slices/modalSlice";

import SvgButton from "../../shared/SvgButton";
import EditJobModal from "./modals/EditJobModal";

import styles from "./index.module.scss";

const MODALS_BY_TYPE = {
  [MODAL.MODAL_TYPES.EDIT_JOB]: EditJobModal,
};

function Modal({ type }) {
  const Component = MODALS_BY_TYPE[type] ?? "div";

  return <Component />;
}

function ModalContainer({ children }) {
  const dispatch = useDispatch();

  const { currentTheme } = useSelector((state) => state.theme);
  const { type } = useSelector((state) => state.modal);

  const [internalType, setInternalType] = useState(type);

  const outsideRef = useRef(null);

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  useOnClickOutside(outsideRef, handleCloseModal);

  useEffect(() => {
    if (type) {
      setInternalType(type);
    } else {
      setTimeout(() => {
        setInternalType(type);
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

          <Modal type={internalType} />
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ModalContainer;
