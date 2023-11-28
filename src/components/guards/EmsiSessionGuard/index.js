import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import EMSI from "../../../utils/constants/emsi";
import useCookie from "../../../hooks/useCookie";
import { setEmsiToken } from "../../../store/slices/emsiSessionSlice";
import { initEmsiSession } from "../../../store/actions/emsiSessionActions";
import api from "../../../singletons/api";

const getIsTokenValid = (token, exp) => {
  if (!token || !exp) {
    return false;
  }

  const nowDate = dayjs();
  const expDate = dayjs(exp);

  return nowDate.isBefore(expDate);
};

function EmsiSessionGuard({ children }) {
  const { sessionUser } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const { getCookie, setCookie } = useCookie();

  const initSession = async () => {
    const emsiAccessToken = getCookie(EMSI.COOKIE_KEYS.ACCESS_TOKEN);
    const emsiAccessTokenExp = getCookie(EMSI.COOKIE_KEYS.ACCESS_TOKEN_EXP);
    const isEmsiTokenValid = getIsTokenValid(
      emsiAccessToken,
      emsiAccessTokenExp,
    );

    if (isEmsiTokenValid) {
      api.skillsApiClient.setToken(emsiAccessToken);
      dispatch(setEmsiToken(emsiAccessToken));
    } else {
      const { payload } = await dispatch(initEmsiSession());

      api.skillsApiClient.setToken(payload.access_token);
      setCookie(EMSI.COOKIE_KEYS.ACCESS_TOKEN, payload.access_token);
      setCookie(
        EMSI.COOKIE_KEYS.ACCESS_TOKEN_EXP,
        dayjs().add(payload.expires_in, "seconds"),
      );
    }
  };

  useEffect(() => {
    if (sessionUser) {
      initSession();
    }
  }, [sessionUser]);

  return children;
}

export default EmsiSessionGuard;
