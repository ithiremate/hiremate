/* eslint-disable no-console */
import apiFactory from "../store/services";

const api = apiFactory({
  onError: (error) => console.error("Request error: ", error),
});

export default api;
