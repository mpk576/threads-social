export type Thread = {
  id: string;
  title: string;
  body: string;
  category: string;
  likes: number;
  dislikes: number;
  reported: boolean;
};

export type Threads = {
  threads: [Thread];
};
