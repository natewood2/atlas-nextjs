import CorrectButton from "./CorrectButton";

interface AnswerProps {
  id: string;
  question_id: string;
  text: string;
  votes: number;
  voted?: boolean;
}

export function Answer({ id, text, votes, question_id, voted = false }: AnswerProps) {
  return (
    <div className="border-t border-gray-200 p-6 first:rounded-t-md flex items-center last:rounded-b-md last:border-b">
      <div className="mr-2 rounded-xl bg-emerald-100 px-2 text-sm text-emerald-700">
        {votes}
      </div>
      <p className="text w-full text-left font-semibold">{text}</p>
      <CorrectButton id={id} questionId={question_id} isAccepted={voted} />
    </div>
  );
}