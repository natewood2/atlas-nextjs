"use client";
import { useState } from "react";
import { markAnswerCorrect } from "@/lib/actions";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function CorrectButton({
  id,
  questionId,
  isAccepted = false,
}: {
  id: string;
  questionId: string;
  isAccepted?: boolean;
}) {
  const [isCorrect, setIsCorrect] = useState(isAccepted);

  const handleMarkCorrect = async (formData: FormData) => {
    try {
      await markAnswerCorrect(formData);
      setIsCorrect(!isCorrect);
    } catch (error) {
      console.error("Error marking answer as correct:", error);
    }
  };

  return (
    <form action={handleMarkCorrect}>
      <input type="hidden" name="answerId" value={id} />
      <input type="hidden" name="questionId" value={questionId} />
      <button
        type="submit"
        className={`rounded-full p-2 ${
          isCorrect
            ? "bg-emerald-500 text-white"
            : "text-gray-500 hover:text-emerald-500"
        }`}
      >
        <CheckIcon className="h-5 w-5" />
      </button>
    </form>
  );
}