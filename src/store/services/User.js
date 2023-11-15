import Base from "./Base";

import fb from "../../singletons/firebase";
import FB from "../../utils/constants/fb";

export default class UserAPI extends Base {
  subscribeOnUserChanges(cb) {
    return this.firebaseApiClient.firebaseRequest({
      query: async (auth) => {
        const docRef = fb.functions.db.doc(
          fb.db,
          `${FB.COLLECTION_TYPES.USERS}/${auth.currentUser.uid}`,
        );

        const unsubscribe = fb.functions.db.onSnapshot(docRef, cb);

        return unsubscribe;
      },
    });
  }

  createUserInDb(currentUser) {
    return this.firebaseApiClient.firebaseRequest({
      query: async () => {
        const userRef = await fb.functions.db.setDoc(
          fb.functions.db.doc(
            fb.db,
            FB.COLLECTION_TYPES.USERS,
            currentUser.uid,
          ),
          currentUser,
        );

        return userRef;
      },
    });
  }

  updateUserFieldInDb(user, uid) {
    return this.firebaseApiClient.firebaseRequest({
      query: async () => {
        const userRef = await fb.functions.db.updateDoc(
          fb.functions.db.doc(fb.db, FB.COLLECTION_TYPES.USERS, uid),
          user,
        );

        return userRef;
      },
    });
  }
}
