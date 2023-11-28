import Base from "./Base";

export default class EmsiSessionAPI extends Base {
  initEmsiSession(body, headers) {
    return this.emsiAuthApiClient.post("/connect/token", body, headers);
  }
}
