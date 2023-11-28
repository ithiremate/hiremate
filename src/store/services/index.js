import ApiClient from "./ApiClient";
import SessionAPI from "./Session";
import EmsiSessionAPI from "./EmsiSession";
import UserAPI from "./User";
import LocationAPI from "./Location";
import JobsAPI from "./Jobs";

export default function apiConstruct({
  locationApiUrl,
  emsiAuthUrl,
  emsiApiUrl,
  onError,
}) {
  const firebaseApiClient = new ApiClient({
    onError,
  });

  const locationApiClient = new ApiClient({
    apiUrl: locationApiUrl,
    onError,
  });

  const emsiAuthApiClient = new ApiClient({
    apiUrl: emsiAuthUrl,
    onError,
  });

  const skillsApiClient = new ApiClient({
    apiUrl: emsiApiUrl,
    onError,
  });

  return {
    firebaseApiClient,
    locationApiClient,
    emsiAuthApiClient,
    skillsApiClient,
    session: new SessionAPI({ firebaseApiClient }),
    emsiSession: new EmsiSessionAPI({ emsiAuthApiClient }),
    user: new UserAPI({ firebaseApiClient }),
    location: new LocationAPI({ locationApiClient }),
    jobs: new JobsAPI({ firebaseApiClient }),
  };
}
