class Base {
  constructor({
    firebaseApiClient,
    locationApiClient,
    emsiAuthApiClient,
    skillsApiClient,
  }) {
    if (
      !firebaseApiClient &&
      !locationApiClient &&
      !emsiAuthApiClient &&
      !skillsApiClient
    ) {
      throw new Error("[apiClient] required");
    }

    this.firebaseApiClient = firebaseApiClient;
    this.locationApiClient = locationApiClient;
    this.emsiAuthApiClient = emsiAuthApiClient;
    this.skillsApiClient = skillsApiClient;
  }
}

export default Base;
