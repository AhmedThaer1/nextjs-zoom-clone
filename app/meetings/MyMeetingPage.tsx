"use client";

import MeetingItems from "@/components/MeetingItems";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const MyMeetingPage = () => {
  const { user } = useUser();

  const client = useStreamVideoClient();

  const [calls, setCalls] = useState<Call[]>();

  useEffect(() => {
    async function fetchCalls() {
      if (!client || !user?.id) {
        return;
      }

      const { calls } = await client.queryCalls({
        sort: [{ field: "starts_at", direction: -1 }],
        filter_conditions: {
          starts_at: { $exists: true },
          $or: [
            { created_by_user_id: user.id },
            { members: { $in: [user.id] } },
          ],
        },
      });

      setCalls(calls);
    }
    fetchCalls();
  }, [client, user?.id]);

  return (
    <div className="space-y-3">
      <h1 className="text-center text-2xl font-bold">My Meetings</h1>
      {!calls && <Loader2 className="mx-auto animate-spin" />}
      {calls?.length === 0 && <p>No meetings found</p>}
      <ul className="list-inside list-disc space-y-2">
        {calls?.map((call) => <MeetingItems key={call.id} call={call} />)}
      </ul>
    </div>
  );
};

export default MyMeetingPage;
