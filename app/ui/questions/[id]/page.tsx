// app/ui/questions/[id]/page.tsx
import { AnswerQuestion } from "@/components/AnswerQuestion";
import { Answer } from "@/components/Answer";
import { fetchAnswers, fetchQuestion } from "@/lib/data";
import { HashtagIcon } from "@heroicons/react/24/outline";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const question = await fetchQuestion(id);
  const answers = await fetchAnswers(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  // Sort answers so the accepted one comes first
  const sortedAnswers = answers.sort((a, b) => {
    if (a.id === question.answer_id) return -1;
    if (b.id === question.answer_id) return 1;
    return 0;
  });

  return (
    <div>
      <h1 className="text-3xl font-black flex items-center">
        <HashtagIcon className="h-6 w-6 mr-2" /> {question.title}
      </h1>
      <AnswerQuestion questionId={question.id} />
      {sortedAnswers.map((answer) => (
        <Answer
          key={answer.id}
          id={answer.id}
          text={answer.answer}
          votes={answer.votes}
          question_id={question.id}
          voted={answer.id === question.answer_id} // This will be true for the accepted answer
        />
      ))}
    </div>
  );
}