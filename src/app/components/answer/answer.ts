export type Answer = {
  id: string;
  body: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  animateAppendState?: "in" | "out";
}
