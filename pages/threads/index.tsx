import React, { ReactElement } from "react";
import { firestore } from "../../src/config/Firebase";
import Link from "next/link";

type Thread = {
  id: string;
  title: string;
  body: string;
  category: string;
  likes: number;
  dislikes: number;
};

interface ThreadsProps {
  threads: [Thread];
}

function index({ threads }: ThreadsProps): ReactElement {
  console.log(threads);
  return (
    <div>
      <h1>This the threads page</h1>
      <div className="threads__wrapper">
        {threads.map((thread) => (
          <div>
            <h2>{thread.title}</h2>
            <p>{thread.body}</p>
            <Link href={`/threads/${thread.id}`}>
              <a>Read thread</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default index;

async function fetchThreads() {
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

export async function getStaticProps() {
  const threads = await fetchThreads();
  console.log(threads);
  return {
    props: {
      threads,
    },
  };
}
