class Base {
  constructor({ firebaseApiClient, locationApiClient }) {
    if (!firebaseApiClient && !locationApiClient) {
      throw new Error("[firebaseApiClient] or [locationApiClient] required");
    }

    this.firebaseApiClient = firebaseApiClient;
    this.locationApiClient = locationApiClient;
  }
}

export default Base;
