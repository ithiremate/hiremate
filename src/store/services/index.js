import ApiClient from "./ApiClient";
import SessionAPI from "./Session";
import UserAPI from "./User";
import LocationAPI from "./Location";

export default function apiConstruct({ locationApiUrl, onError }) {
  const firebaseApiClient = new ApiClient({
    onError,
  });

  const locationApiClient = new ApiClient({
    locationApiUrl,
    onError,
  });

  return {
    firebaseApiClient,
    locationApiClient,
    session: new SessionAPI({ firebaseApiClient }),
    user: new UserAPI({ firebaseApiClient }),
    location: new LocationAPI({ locationApiClient }),
  };
}
