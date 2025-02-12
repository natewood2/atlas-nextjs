"use server";

import { revalidatePath } from "next/cache";
import { incrementVotes, insertQuestion, insertTopic, insertAnswer } from "./data";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
    try {
      insertQuestion({
        title: question.get("title") as string,
        topic_id: question.get("topic_id") as string,
        votes: 0,
      });
      revalidatePath("/ui/topics/[id]", "page");
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to add question.");
    }
  }

  export async function addVote(data: FormData) {
    try {
      incrementVotes(data.get("id") as string);
      revalidatePath("/ui/topics/[id]", "page");
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to add vote.");
    }
  }

  export async function addAnswer(formData: FormData) {
    try {
      await insertAnswer({
        answer: formData.get("answer") as string,
        question_id: formData.get("question_id") as string,
      });
      revalidatePath("/ui/questions/[id]", "page");
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to add answer.");
    }
  }

  export async function markAnswerCorrect(formData: FormData) {
    try {
      const questionId = formData.get("questionId") as string;
      const answerId = formData.get("answerId") as string;
      
      await updateQuestionAnswer(questionId, answerId);
      revalidatePath("/ui/questions/[id]", "page");
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to mark answer as correct.");
    }
  }

  export async function updateQuestionAnswer(questionId: string, answerId: string) {
    try {
      const data = await sql`
        UPDATE questions 
        SET answer_id = ${answerId}
        WHERE id = ${questionId}
        RETURNING *
      `;
      return data.rows[0];
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to update question answer.");
    }
  }
