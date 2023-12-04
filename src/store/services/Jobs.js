import Base from "./Base";

import fb from "../../singletons/firebase";
import FB from "../../utils/constants/fb";

export default class JobsAPI extends Base {
  subscribeOnJobsChanges(cb) {
    return this.firebaseApiClient.firebaseRequest({
      query: async (auth) => {
        const collectionRef = fb.functions.db.collection(
          fb.db,
          `${FB.COLLECTION_TYPES.JOBS}/${auth.currentUser.uid}/items`,
        );

        const unsubscribe = fb.functions.db.onSnapshot(collectionRef, cb);

        return unsubscribe;
      },
    });
  }

  postNewJob(newJob) {
    return this.firebaseApiClient.firebaseRequest({
      query: async (auth) => {
        const collectionRef = fb.functions.db.doc(
          fb.db,
          `${FB.COLLECTION_TYPES.JOBS}/${auth.currentUser.uid}/items`,
          newJob.id,
        );

        await fb.functions.db.setDoc(collectionRef, newJob);
      },
    });
  }

  editJob(job) {
    return this.firebaseApiClient.firebaseRequest({
      query: async (auth) => {
        const docref = fb.functions.db.doc(
          fb.db,
          `${FB.COLLECTION_TYPES.JOBS}/${auth.currentUser.uid}/items/${job.id}`,
        );

        await fb.functions.db.setDoc(docref, job);
      },
    });
  }

  deleteJob(id) {
    return this.firebaseApiClient.firebaseRequest({
      query: async (auth) => {
        const docref = fb.functions.db.doc(
          fb.db,
          `${FB.COLLECTION_TYPES.JOBS}/${auth.currentUser.uid}/items/${id}`,
        );

        await fb.functions.db.deleteDoc(docref);
      },
    });
  }
}
