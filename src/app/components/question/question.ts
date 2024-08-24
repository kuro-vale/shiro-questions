export type Question = {
  id: string;
  body: string;
  category: string;
  solved: boolean;
  createdBy: string;
  createdAt: string;
}

export type QuestionRequest = {
  body: string,
  category: string
}
