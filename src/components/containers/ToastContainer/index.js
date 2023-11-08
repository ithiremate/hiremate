import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { hideToast } from "../../../store/slices/toastSlice";

import Toast from "./molecules/Toast";

import styles from "./index.module.scss";

const SWITCH_TOAST_DURATION = 500;
const DEFAULT_ACTIVE_TOASST = {
  isVisible: false,
  message: "",
  type: "",
  duration: 0,
};

function ToastContainer({ children }) {
  const dispatch = useDispatch();
  const toastState = useSelector((state) => state.toast);

  const [toastQueue, setToastQueue] = useState([]);
  const [activeToast, setActiveToast] = useState(DEFAULT_ACTIVE_TOASST);

  const hideActiveToast = () => {
    setActiveToast((prevToast) => ({ ...prevToast, isVisible: false }));

    setTimeout(() => {
      setActiveToast(DEFAULT_ACTIVE_TOASST);
    }, SWITCH_TOAST_DURATION);
  };

  const showNextToast = () => {
    if (toastQueue.length > 0) {
      const nextToast = toastQueue[0];

      setActiveToast(nextToast);

      setTimeout(() => {
        setToastQueue((prevQueue) => prevQueue.slice(1));

        hideActiveToast();
        dispatch(hideToast());
      }, nextToast.duration);
    }
  };

  useEffect(() => {
    if (toastState.message) {
      const newToast = { ...toastState, isVisible: true };

      setToastQueue([...toastQueue, newToast]);
    }
  }, [toastState.message]);

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
