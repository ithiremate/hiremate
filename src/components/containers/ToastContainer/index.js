/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { hideToasts } from "../../../store/slices/toastSlice";

import Toast from "./molecules/Toast";

import styles from "./index.module.scss";

const SWITCH_TOAST_DURATION = 500;
const DEFAULT_ACTIVE_TOAST = {
  isVisible: false,
  message: "",
  type: "",
  duration: 0,
};

function ToastContainer({ children }) {
  const dispatch = useDispatch();
  const stateToasts = useSelector((state) => state.toast.toasts);

  const [toastQueue, setToastQueue] = useState([]);
  const [activeToast, setActiveToast] = useState(DEFAULT_ACTIVE_TOAST);

  const hideActiveToast = () => {
    setActiveToast((prevToast) => ({ ...prevToast, isVisible: false }));

    setTimeout(() => {
      setActiveToast(DEFAULT_ACTIVE_TOAST);
    }, SWITCH_TOAST_DURATION);
  };

  const showNextToast = () => {
    if (toastQueue.length > 0) {
      const nextToast = toastQueue[0];

      setActiveToast({ ...nextToast, isVisible: true });

      setTimeout(() => {
        setToastQueue((prevQueue) => prevQueue.slice(1));

        hideActiveToast();
      }, nextToast.duration);
    }

    if (toastQueue.length === 0) {
      dispatch(hideToasts());
    }
  };

  useEffect(() => {
    if (stateToasts.length) {
      setToastQueue(stateToasts);
    }
  }, [stateToasts]);

  useEffect(() => {
    if (!activeToast.message) {
      showNextToast();
    }
  }, [toastQueue, activeToast]);

  return (
    <div className={styles.container}>
      {children}

      <Toast {...activeToast} />
    </div>
  );
}

export default ToastContainer;
