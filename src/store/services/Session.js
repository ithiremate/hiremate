import Base from "./Base";

import fb from "../../singletons/firebase";

export default class SessionAPI extends Base {
  subscribeOnSessionChanges(cb) {
    return this.firebaseApiClient.firebaseRequest({
      query: (auth) => {
        const currentUser = fb.functions.auth.onAuthStateChanged(auth, cb);

        return currentUser;
      },
    });
  }

  createUserWithEmailAndPassword(email, password) {
    return this.firebaseApiClient.firebaseRequest({
      query: (auth) =>
        fb.functions.auth.createUserWithEmailAndPassword(auth, email, password),
    });
  }

  sendEmailVerification(user) {
    return this.firebaseApiClient.firebaseRequest({
      query: () => fb.functions.auth.sendEmailVerification(user),
    });
  }

  signInWithEmailAndPassword(email, password) {
    return this.firebaseApiClient.firebaseRequest({
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
}
