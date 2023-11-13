import Base from "./Base";

import fb from "../../singletons/firebase";
import FB from "../../utils/constants/fb";

export default class UserAPI extends Base {
  createUserInDb(currentUser) {
    return this.apiClient.request({
      query: async () => {
        const {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          profileCompleted,
          uid,
        } = currentUser;

        const userRef = await fb.functions.db.setDoc(
          fb.functions.db.doc(fb.db, FB.COLLECTION_TYPES.USERS, uid),
          {
            displayName,
            email,
            emailVerified,
            phoneNumber,
            photoURL,
            profileCompleted,
            uid,
          },
        );

        return userRef;
      },
    });
  }

  subscribeOnUserChanges(cb) {
    return this.apiClient.request({
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
}
