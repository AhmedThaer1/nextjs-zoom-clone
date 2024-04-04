import useLoadRecording from "@/hooks/useLoadRecording";
import useStreamCall from "@/hooks/useStreamCall";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecordingList = () => {
  const call = useStreamCall();
  const { recordings, recordingsLoading } = useLoadRecording(call);

  const { user, isLoaded: userLoaded } = useUser();

  if (userLoaded && !user) {
    return <p className="text-center">Please sign in to view recordings.</p>;
  }

  if (recordingsLoading)
    return <Loader2 className="mx-auto animate-spin text-white" />;

  return (
    <div className="space-y-3 text-center">
      {recordings.length === 0 && <p>No recordings found</p>}
      <ul className="list-inside list-disc">
        {recordings
          .sort((a, b) => b.end_time.localeCompare(a.end_time))
          .map((rec) => (
            <li key={rec.url}>
              <Link href={rec.url} target="_blank" className="hover:underline">
                {new Date(rec.end_time).toLocaleString()}
              </Link>
            </li>
          ))}
      </ul>
      <p className="text-sm text-gray-500">
        Note It Can Take SomeTime For Recordings To Appear Here.
        <br />
        Yor can refresh the page to see the latest recordings.
      </p>
    </div>
  );
};

export default RecordingList;
