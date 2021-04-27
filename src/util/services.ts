import { firestore } from "../config/Firebase";
import { Thread } from "./types";

export async function fetchThreads() {
  try {
    const snapshot = await firestore.collection("threads").get();
    console.log("snapshot", snapshot);
    return snapshot.docs.map((doc) => {
      const thread: Thread = {
        id: doc.id,
        title: doc.data().title,
        category: doc.data().category,
        likes: doc.data().likes,
        dislikes: doc.data().dislikes,
        body: doc.data().body,
      };
      console.log("Thread data", thread);
      return thread;
    });
  } catch (error) {
    return [];
  }
}

export async function fetchThreadIds() {
  try {
    const snapshot = await firestore.collection("threads").get();
    return snapshot.docs.map((doc) => doc.id);
  } catch (error) {
    return [];
  }
}

export async function fetchThread(id: string) {
  try {
    const doc = await firestore.collection("threads").doc(id).get();
    if (doc.exists) {
      const thread: Thread = {
        id,
        title: doc.data().title,
        body: doc.data().body,
        category: doc.data().category,
        dislikes: doc.data().dislikes,
        likes: doc.data().likes,
        reported: doc.data().reported,
      };
      return thread;
    }
  } catch (error) {
    return [];
  }
}
