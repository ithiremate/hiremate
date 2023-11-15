import Base from "./Base";

export default class SessionAPI extends Base {
  searchLocation(query) {
    return this.locationApiClient.get(
      `/search?format=json&accept-language=uk&q=${encodeURIComponent(query)}`,
    );
  }
}
