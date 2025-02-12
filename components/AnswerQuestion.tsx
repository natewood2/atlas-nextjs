import { addAnswer } from "@/lib/actions";

export function AnswerQuestion({ questionId }: { questionId: string }) {
  return (
    <form className="my-8 relative" action={addAnswer}>
      <input type="hidden" name="question_id" value={questionId} />
      <input
        type="text"
        name="answer"
        placeholder="Answer that question"
        className="w-full rounded-md border p-3 pr-28"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 rounded-md bg-secondary px-4 py-2 text-white"
      >
        Answer
      </button>
    </form>
  );
}
