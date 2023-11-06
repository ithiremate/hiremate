import ApiClient from "./ApiClient";
import SessionAPI from "./Session";

export default function apiConstruct({ onError }) {
  const apiClient = new ApiClient({
    onError,
  });

  return {
    apiClient,
    session: new SessionAPI({ apiClient }),
  };
}
