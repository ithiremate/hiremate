import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeOnSessionChanges } from "../../../store/actions/sessionActions";

function SessionGuard({ children }) {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.session);

  useEffect(() => {
    if (!isInitialized) {
      setTimeout(() => {
        dispatch(subscribeOnSessionChanges());
      }, 2000);
    }
  }, []);

  return children;
}

export default SessionGuard;
