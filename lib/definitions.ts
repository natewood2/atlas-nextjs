// lib/definitions.ts
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Topic = {
  id: string;
  title: string;
};

export type Question = {
  id: string;
  title: string;
  topic_id: string;
  votes: number;
  answer_id?: string; // Add this to track correct answer
};

export interface Answer {
  votes: any;
  id: string;
  answer: string;
  question_id: string;
  // Remove votes and voted as they're not in the database
}