import firebase from "../../singletons/firebase";

const TIMEOUT_ERROR_DURATION = 25000;

export default class ApiClient {
  constructor({ apiUrl, onError = () => {} }) {
    this.apiUrl = apiUrl;
    this.onError = onError;
  }

  async get(url) {
    return this.fetchRequest({
      url,
      method: "GET",
    });
  }

  async post(url, body, headers) {
    return this.fetchRequest({
      url,
      body,
      headers,
      method: "POST",
    });
  }

  setToken(token) {
    this.token = token;
  }

  async firebaseRequest({ query, payload = {} }) {
    try {
      const res = await query(firebase.auth, { ...payload });

      return res;
    } catch (error) {
      this.onError(error);

      throw error;
    }
  }

  async fetchRequest({ url, body, headers, method }) {
    const requestUrl = `${this.apiUrl}${url}`;
    const controller = new AbortController();
    const { signal } = controller;

    const options = {
      method,
      signal,
      ...(body ? { body } : {}),
      ...(headers ? { headers } : {}),
    };

    const timeoutRef = setTimeout(
      () => controller.abort(),
      TIMEOUT_ERROR_DURATION,
    );

    try {
      const res = await fetch(requestUrl, options);
      const json = res.json();

      return json;
    } catch (error) {
      this.onError(error);

      throw error;
    } finally {
      clearTimeout(timeoutRef);
    }
  }
}
