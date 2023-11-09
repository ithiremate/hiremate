import Base from "./Base";

import fb from "../../singletons/firebase";

export default class SessionAPI extends Base {
  subscribeOnSessionChanges(cb) {
    return this.apiClient.request({
      query: (auth) => {
        const currentUser = fb.functions.auth.onAuthStateChanged(auth, cb);

        return currentUser;
      },
    });
  }

  sendEmailVerification(user) {
    return this.apiClient.request({
      query: () => fb.functions.auth.sendEmailVerification(user),
    });
  }

  signInWithEmailAndPassword(email, password) {
    return this.apiClient.request({
      query: (auth) => {
        const currentUser = fb.functions.auth.signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        return currentUser;
      },
    });
  }

  createUserWithEmailAndPassword(email, password) {
    return this.apiClient.request({
      query: (auth) =>
        fb.functions.auth.createUserWithEmailAndPassword(auth, email, password),
    });
  }
}
