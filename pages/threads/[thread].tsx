import React, { ReactElement } from "react";
import { fetchThreadIds, fetchThread } from "../../src/util/services";
import { Thread } from "../../src/util/types";

interface Props {
  threadData: Thread;
}

function thread({ threadData }: Props): ReactElement {
  console.log(threadData);
  return (
    <div>
      <h1>Thread page</h1>
    </div>
  );
}

export default thread;

export async function getStaticPaths() {
  const threadIds = await fetchThreadIds();
  const paths = threadIds.map((id) => ({
    params: { thread: id },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

// for each page get the data for this page
export async function getStaticProps({ params }) {
  console.log("params", params);
  const { thread } = params;

  const threadData = await fetchThread(thread);
  console.log("Thread", threadData);
  return {
    props: { threadData },
  };
}
