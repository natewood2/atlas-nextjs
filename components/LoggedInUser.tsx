import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type LoggedInUserProps = {
  name?: string;
  avatar?: string;
}

export default function LoggedInUser({ name, avatar }: LoggedInUserProps) {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-md bg-gray-50">
      {avatar ? (
        <Image
          src={avatar}
          alt={`${name}'s avatar`}
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
          unoptimized
        />
      ) : (
        <UserCircleIcon className="h-8 w-8 text-gray-400" />
      )}
      <span className="text-sm font-medium text-gray-700">
        {name || 'Test User'}
      </span>
    </div>
  );
}