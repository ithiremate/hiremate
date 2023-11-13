import ApiClient from "./ApiClient";
import SessionAPI from "./Session";
import UserAPI from "./User";

export default function apiConstruct({ onError }) {
  const apiClient = new ApiClient({
    onError,
  });

  return {
    apiClient,
    session: new SessionAPI({ apiClient }),
    user: new UserAPI({ apiClient }),
  };
}
