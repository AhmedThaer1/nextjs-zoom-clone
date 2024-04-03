import { useUser } from "@clerk/nextjs";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export default function useLoadRecording(call: Call) {
  const { user } = useUser();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [recordingsLoading, setRecordingsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecordings() {
      setRecordingsLoading(true);

      if (!user?.id) return;

      const { recordings } = await call.queryRecordings();
      setRecordings(recordings);

      setRecordingsLoading(false);
    }
    fetchRecordings();
  }, [call, user?.id]);

  return { recordings, recordingsLoading };
}
