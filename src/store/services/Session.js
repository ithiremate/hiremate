import Base from "./Base";

import fb from "../../singletons/firebase";

export default class SessionAPI extends Base {
  subscribe(cb) {
    return this.apiClient.request({
      query: (auth) => {
        const currentUser = fb.functions.auth.onAuthStateChanged(auth, cb);

        return currentUser;
      },
    });
  }
}
