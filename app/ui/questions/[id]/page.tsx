import { AnswerQuestion } from "@/components/AnswerQuestion";
import { Answer } from "@/components/Answer";
import { fetchAnswers, fetchQuestion } from "@/lib/data";
import { HashtagIcon } from "@heroicons/react/24/outline";

interface PageParams {
  id: string;
}

interface Props {
  params: Promise<PageParams>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const question = await fetchQuestion(id);
  const answers = await fetchAnswers(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  // sorting
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
          voted={answer.id === question.answer_id}
        />
      ))}
    </div>
  );
}