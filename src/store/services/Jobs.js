import Base from "./Base";

import fb from "../../singletons/firebase";
import FB from "../../utils/constants/fb";

export default class JobsAPI extends Base {
  subscribeOnJobsChanges(cb) {
    return this.firebaseApiClient.firebaseRequest({
      query: async (auth) => {
        const docRef = fb.functions.db.doc(
          fb.db,
          `${FB.COLLECTION_TYPES.JOBS}/${auth.currentUser.uid}`,
        );

        const unsubscribe = fb.functions.db.onSnapshot(docRef, cb);

        return unsubscribe;
      },
    });
  }
}
